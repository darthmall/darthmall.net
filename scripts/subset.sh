#!/usr/bin/env bash

RANGE='U+0-FF,U+131,U+152,U+153,U+2BB,U+2BC,U+2C6,U+2DA,U+2DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'

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
