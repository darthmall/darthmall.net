#!/usr/bin/env bash

RANGE="$(glyphhanger --LATIN)"

pyftsubset \
  'src/fonts/Epilogue[slnt,wght].woff2' \
  --unicodes="${RANGE}" \
  --flavor=woff2 \
  --layout-features="ccmp,locl,mark,mkmk,kern,liga,frac,pnum,zero,ss01,smcp,subs,sups,cpsp,case" \
  --output-file='src/fonts/Epilogue[slnt,wght]-latin.woff2'

pyftsubset \
  'src/fonts/SportingGrotesque-Bold.woff2' \
  --unicodes="${RANGE}" \
  --flavor=woff2 \
  --layout-features+="titl,onum" \
  --layout-features-="ss01,lnum" \
  --output-file='src/fonts/SportingGrotesque-Bold-latin.woff2'

pyftsubset \
  'src/fonts/SportingGrotesque.woff2' \
  --unicodes="${RANGE}" \
  --flavor=woff2 \
  --layout-features+="titl,onum" \
  --layout-features-="ss01,lnum" \
  --output-file='src/fonts/SportingGrotesque-latin.woff2'
