#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Does the LIVE SITE serve what this working copy says it should?

WHY THIS EXISTS.  Every other gate reads the repository.  Not one of them looks
at what a visitor actually receives, and in three days that gap produced four
separate incidents:

  * 2026-07-30f  `/reader/reader.html` served the RETIRED reader for hours after
                 the stub was deployed — a stale edge object, mis-diagnosed
                 twice before a deploy cleared it.
  * 2026-07-30g  a cached `i18n.js` against new HTML would have printed raw keys
                 (`tip_toc`) as tooltips on screen.
  * 2026-07-30h  `osbct.buddha-dhamma.net` returned GitHub's own 404 — a cited
                 URL broken rather than moved — while this file recorded it as
                 redirecting.
  * 2026-07-30i  the whole site was fine and 3,774 cross-references still landed
                 on the wrong page, because a derived file was eight days old.
                 (`check_derived.py` guards that one now, before the push.)

Each was found by hand, late, and each cost an hour or more.

WHAT IT CHECKS, and the one idea worth keeping: every URL is fetched TWICE —
bare, which is what a visitor gets, and again with a unique query string, which
misses any edge cache and so reaches the origin.  **If the two differ, the edge
is serving something the origin no longer has**, which is precisely the failure
of 2026-07-30f and is invisible to any check that fetches once.

  * every published page carries the BUILD this working copy stamped
  * key data files are byte-identical to the local ones (sha1)
  * `/reader/reader.html` is the retirement stub, not the old reader
  * the `osbct.` hostname still 301s to the apex — Zenodo and CITATION.cff
    depend on it and GitHub Pages does NOT do this for you
  * bare == cache-busted, for all of the above

Run it AFTER pushing.  A push is not a deploy; GitHub Pages takes a minute or
two, so a failure immediately after pushing may only mean "not yet".  Re-run.

Usage:
  python3 pipeline/verify_live.py [--origin https://buddha-dhamma.net]
                                  [--redirect-host osbct.buddha-dhamma.net]
                                  [--quiet]
Exit 0 = the live site matches this working copy.
"""
import hashlib, os, re, ssl, sys, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = 'OSBCT-verify-live/1.0'
TIMEOUT = 20

# (path, local file or None, kind)
TARGETS = [
    ('/index.html',            'site/index.html',            'page'),
    ('/about.html',            'site/about.html',            'page'),
    ('/reader/reader2.html',   'site/reader/reader2.html',   'html'),
    ('/search.html',           'site/search.html',           'html'),
    ('/errata.html',           'site/errata.html',           'html'),
    ('/downloads.html',        'site/downloads.html',        'html'),
    ('/reader/reader.html',    'site/reader/reader.html',    'stub'),
    ('/i18n.js',               'site/i18n.js',               'text'),
    # !!! panel.js WAS NEVER FETCHED BY THIS GATE.  reader2.html is compared
    # byte-for-byte but the file carrying the entire word-lookup feature was
    # not in the list, so 'LIVE SITE MATCHES' could be printed while the
    # deployed panel was an older build with the flag defaulting off.
    ('/reader/panel.js',       'site/reader/panel.js',       'bytes'),
    # 2026-10-21: the IEBH sandhi solver the pane's Sandhi button loads (_panel/build_solver.py).
    ('/reader/sandhi-solver.js', 'site/reader/sandhi-solver.js', 'bytes'),
    # 2026-09-05: the one search implementation, and the manifest of the
    # postings shards it reads.  A stale searchcore.js against a new manifest
    # (or the reverse) is the split-brain this gate exists to see.
    ('/searchcore.js',         'site/searchcore.js',         'bytes'),
    ('/index/tp/index.json',   'site/index/tp/index.json',   'bytes'),
    # later 2026-09-05: the n-gram sweep manifest.  If it is missing live,
    # searchcore.js silently sweeps k.txt again (12.5 MB) — by design an
    # archive fallback, but on the live site it would be a regression this
    # gate must see.
    ('/index/tg/index.json',   'site/index/tg/index.json',   'bytes'),
    # fourth session: the section-name shards' manifest.  Missing live, both
    # search UIs silently read names.json whole again (1.09 MB) — the same
    # archive fallback, the same regression if it happens on the live site.
    ('/index/tn/index.json',   'site/index/tn/index.json',   'bytes'),
    # and the self-hosted type: site/fonts/ is NEW, and .gitignore decides
    # what Actions publishes.  A 404 here means every page fell back to a
    # generic serif and the Pāḷi diacritics are rendering as tofu.
    ('/fonts/fonts.css',       'site/fonts/fonts.css',       'bytes'),
    ('/reader/pageindex.json', 'site/reader/pageindex.json', 'bytes'),
    ('/reader/manifest.json',  'site/reader/manifest.json',  'bytes'),
    ('/errata.json',           'site/errata.json',           'bytes'),
]


def get(url, follow=True):
    # `OpenerDirector.open()` takes NO `context` argument — passing one raises
    # TypeError, and the first version of this file caught that with the broad
    # `except Exception` below and reported it as `HTTP 0`, i.e. as a dead
    # origin.  A gate that reports its own bug as a site outage is worse than no
    # gate, so the handler carries the SSL context and the message below names
    # the exception class.
    req = urllib.request.Request(url, headers={'User-Agent': UA,
                                               'Cache-Control': 'no-cache'})
    handlers = [urllib.request.HTTPSHandler(context=ssl.create_default_context())]
    if not follow:
        class NoRedirect(urllib.request.HTTPRedirectHandler):
            def redirect_request(self, *a, **k):
                return None
        handlers.append(NoRedirect())
    op = urllib.request.build_opener(*handlers)
    try:
        with op.open(req, timeout=TIMEOUT) as r:
            return r.status, r.read(), dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, e.read(), dict(e.headers)
    except Exception as e:                                   # DNS, TLS, timeout
        return 0, ('%s: %s' % (type(e).__name__, e)).encode(), {}


def local_wlv():
    """The panel's own version, which moves when BUILD does not.

    BUILD is stamped from the JSON and i18n.js, so a change confined to
    reader2.html and panel.js moves nothing -- that is the 2026-07-31c trap,
    and it is exactly what a panel-only deploy looks like.  WLV is the
    constant that DOES move, so check the live HTML against it by name.
    """
    try:
        s = open(os.path.join(ROOT, 'site/reader/panel.js'), encoding='utf-8').read()
    except OSError:
        return None
    m = re.search(r"var WLV = '([^']*)'", s)
    return m.group(1) if m else None


def local_panel_tag():
    """The `panel.js?v=` the working copy's reader2.html asks for.

    !!! THIS IS NOT WLV, AND THE GATE USED TO ASSUME IT WAS (2026-09-05).  The
    script tag versions the panel's CODE; WLV versions the panel's DATA (the R2
    stores), and the two move independently by design — a code-only change to
    panel.js bumps the tag and must NOT bump WLV, or every reader re-fetches
    stores that did not change.  On 2026-09-05 the tag went to 20260905a with
    WLV still 20260810a, the deploy was correct and complete, and this gate
    reported "GitHub Pages has not finished deploying.  Wait a minute" — a
    wrong diagnosis with a confident remedy.  The invariant is: the LIVE page
    asks for the same tag the WORKING COPY asks for.
    """
    try:
        s = open(os.path.join(ROOT, 'site/reader/reader2.html'), encoding='utf-8').read()
    except OSError:
        return None
    m = re.search(r'panel\.js\?v=([^"\']*)', s)
    return m.group(1) if m else None


def local_build():
    s = open(os.path.join(ROOT, 'site/reader/reader2.html'), encoding='utf-8').read()
    m = re.search(r"const BUILD='([^']*)'", s)
    return m.group(1) if m else None


def run(origin, redirect_host, quiet=False):
    want = local_build()
    wlv = local_wlv()
    ptag = local_panel_tag()
    if not want:
        print('cannot read BUILD from the local reader2.html'); return 1
    print('working copy BUILD %s   WLV %s   panel.js?v=%s   origin %s\n'
          % (want, wlv or '(none)', ptag or '(none)', origin))
    bad = 0
    for path, local, kind in TARGETS:
        url = origin.rstrip('/') + path
        st_a, body_a, _ = get(url)
        st_b, body_b, _ = get(url + ('&' if '?' in url else '?') + 'livecheck=' + want)
        notes = []
        if st_a != 200:
            notes.append('HTTP %s%s' % (st_a, ' — ' + body_a.decode('utf-8', 'replace')[:90]
                                        if st_a == 0 else ''))
        elif body_a != body_b:
            # the visitor and the origin disagree — an edge object outlived a deploy
            notes.append('EDGE STALE: bare fetch differs from cache-busted '
                         '(%d vs %d bytes)' % (len(body_a), len(body_b)))
        else:
            if kind in ('html', 'page', 'stub'):
                txt = body_a.decode('utf-8', 'replace')
                m = re.search(r"const BUILD='([^']*)'", txt)
                if kind in ('html', 'page'):
                    # `html` MUST carry a BUILD (it fetches data through jget);
                    # `page` need not — `index.html` and `about.html` fetch
                    # nothing, and demanding a stamp of them made this gate fail
                    # on its first real run for no reason at all.  Both kinds
                    # must still version i18n.js, which is the trap of
                    # 2026-07-30g: new HTML against a cached translation table
                    # renders the raw keys (`tip_toc`) on screen.
                    if kind == 'html' and not m:
                        notes.append('no BUILD constant')
                    elif m and m.group(1) != want:
                        notes.append('BUILD %s, expected %s' % (m.group(1), want))
                    if 'i18n.js' in txt and ('i18n.js?v=' + want) not in txt:
                        notes.append('i18n.js is not versioned to this BUILD')
                    # the same trap one file over: stale HTML asks for the
                    # stale panel.js, and the ?v= on the script tag cannot
                    # help because it is IN the stale HTML.  Name it plainly.
                    if ptag and 'panel.js' in txt \
                            and ('panel.js?v=' + ptag) not in txt:
                        live_v = re.search(r'panel\.js\?v=([^"\']*)', txt)
                        notes.append('the live page asks for panel.js?v=%s but this '
                                     'copy asks for ?v=%s — the word-lookup panel a '
                                     'visitor gets is NOT this one'
                                     % (live_v.group(1) if live_v else '(none)', ptag))
                else:
                    if 'reader2.html' not in txt or len(body_a) > 8000:
                        notes.append('does NOT look like the retirement stub '
                                     '(%d bytes) — the old reader may be back'
                                     % len(body_a))
            if local:
                lp = os.path.join(ROOT, local)
                if os.path.exists(lp):
                    h_live = hashlib.sha1(body_a).hexdigest()
                    h_loc = hashlib.sha1(open(lp, 'rb').read()).hexdigest()
                    # !!! THE HTML MUST BE COMPARED BYTE-FOR-BYTE TOO
                    # (2026-07-31c).  `stamp_build.py` hashes JSON and i18n.js
                    # only, so **an HTML-ONLY CHANGE MOVES NO BUILD** — and this
                    # gate checked only the BUILD constant, so it reported a
                    # page "ok" while the origin served an older copy of it.
                    # Three rounds of a mobile bug went into chasing that: the
                    # fix was in the repository, the gate was green, and the
                    # page being served was not the page in the working copy.
                    if h_live != h_loc:
                        notes.append('%s DIFFERS from the local file '
                                     '(live %s… local %s…)%s'
                                     % ('CONTENT' if kind == 'bytes' else 'HTML',
                                        h_live[:8], h_loc[:8],
                                        '' if kind == 'bytes'
                                        else ' — BUILD cannot detect this'))
        bad += bool(notes)
        if notes or not quiet:
            print('  %-24s %s  %s' % (path, 'ok  ' if not notes else 'FAIL',
                                      '; '.join(notes)))
    if redirect_host:
        u = 'https://%s/reader/reader2.html' % redirect_host
        st, _, hdr = get(u, follow=False)
        loc = hdr.get('Location') or hdr.get('location') or ''
        ok = st in (301, 302, 308) and origin.rstrip('/') in loc
        bad += not ok
        if not ok or not quiet:
            print('  %-24s %s  %s' % (redirect_host, 'ok  ' if ok else 'FAIL',
                                      'HTTP %s -> %s' % (st, loc or '(no Location)')))
    print('\n%s' % ('LIVE SITE MATCHES the working copy' if not bad else
                    '%d CHECK(S) FAILED — the live site is not what this copy says' % bad))
    if bad:
        print(diagnose())
    return bad


def diagnose():
    """Say WHY the site is behind: unpushed, or pushed and still deploying.

    On its first real run (2026-07-30j) this gate correctly reported the live
    site one build behind, and could not say whether the answer was `push` or
    `wait` — the operator had in fact pushed thirty seconds earlier.  Those need
    different actions, and the repository already knows which it is.
    """
    import subprocess

    def git(*a):
        try:
            return subprocess.run(('git', '--no-optional-locks') + a, cwd=ROOT,
                                  capture_output=True, text=True, timeout=15).stdout.strip()
        except Exception:
            return ''
    head, origin = git('rev-parse', 'HEAD'), git('rev-parse', 'origin/main')
    dirty = git('status', '--porcelain')
    if not head:
        return '\n(not a git checkout — cannot say whether this is unpushed or undeployed)'
    if dirty:
        n = len(dirty.split('\n'))
        return ('\nWHY: %d file(s) are still uncommitted. Commit and push them, then re-run.'
                % n)
    if origin and head != origin:
        return ('\nWHY: HEAD (%s) is ahead of origin/main (%s) — the work is committed but '
                'NOT PUSHED.\n     Push, wait a minute, then re-run.' % (head[:7], origin[:7]))
    return ('\nWHY: the working copy is committed and pushed (HEAD == origin/main == %s), and\n'
            '     bare and cache-busted fetches AGREE, so this is not a stale edge object —\n'
            '     GitHub Pages has not finished deploying. Wait a minute and re-run.\n'
            '     (A differing pair would have printed EDGE STALE above; that is the other\n'
            '      failure, and it needs a deploy, not patience.)' % head[:7])


if __name__ == '__main__':
    a = sys.argv[1:]
    org = a[a.index('--origin') + 1] if '--origin' in a else 'https://buddha-dhamma.net'
    rh = (a[a.index('--redirect-host') + 1] if '--redirect-host' in a
          else 'osbct.buddha-dhamma.net')
    sys.exit(1 if run(org, rh, '--quiet' in a) else 0)
