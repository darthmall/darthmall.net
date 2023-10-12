export PATH := "./node_modules/.bin:" + env_var('PATH')

UNICODE_RANGE := 'U+0-FF,U+131,U+152,U+153,U+2BB,U+2BC,U+2C6,U+2DA,U+2DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
SITE_DIR := "_site"
FONT_OUTPUT := SITE_DIR / "fonts"

build:
	eleventy

subset-fonts: subset-epilogue subset-atkinson subset-sporting-grotesque

_font_dir:
	mkdir -p {{FONT_OUTPUT}}

subset-epilogue: _font_dir
	pyftsubset \
		'_fonts/Epilogue[slnt,wght].woff2' \
		--unicodes="{{UNICODE_RANGE}}" \
		--flavor=woff2 \
		--layout-features="ccmp,locl,mark,mkmk,kern,liga,frac,pnum,zero,ss01,smcp,subs,sups,cpsp,case" \
		--output-file='{{FONT_OUTPUT}}/Epilogue[slnt,wght]-latin.woff2'

subset-sporting-grotesque: _font_dir
	pyftsubset \
		'_fonts/SportingGrotesque-Bold.woff2' \
		--unicodes="{{UNICODE_RANGE}}" \
		--flavor=woff2 \
		--layout-features+="titl,onum" \
		--layout-features-="ss01,lnum" \
		--output-file='{{FONT_OUTPUT}}/SportingGrotesque-Bold-latin.woff2'

subset-atkinson: _font_dir
	#!/usr/bin/env bash
	set -euxo pipefail
	for font in _fonts/Atkinson-Hyperlegible*.woff2; do
		fontname=$(basename "$font" .woff2)
		pyftsubset \
			$font \
			--unicodes="{{UNICODE_RANGE}}" \
			--flavor=woff2 \
			--output-file="{{FONT_OUTPUT}}/${fontname}-latin.woff2"
	done

clean:
 rm -rf {{SITE_DIR}}
