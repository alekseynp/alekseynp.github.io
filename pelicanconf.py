#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Aleksey Nozdrn-Plotnicki'
SITENAME = 'Aleksey Nozdryn-Plotnicki'
SITESUBTITLE = ''
SITEURL = ''

THEME = '/home/aleksey/code/alekseynp.github.io/pelican/theme/freelancer-theme-pelican/'
THEME_STATIC_DIR = 'static'
PATH = 'content'
STATIC_PATHS = ['images', 'js', 'css', 'fonts', 'viz']
READERS = {'html': None}
TIMEZONE = 'America/Lima'

DEFAULT_LANG = u'es'
BOOTSTRAP_FILE = 'bootstrap.min.css'
CSS_FILE = 'freelancer.css'
FONTS = 'fonts'

SCRIPTS = [
	'jquery-1.11.0.js',
	'bootstrap.min.js',
	'http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js',
	'classie.js',
	'cbpAnimatedHeader.js',
	'jqBootstrapValidation.js',
	'contact_me.js',
	'freelancer.js'
]

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

DIRECT_TEMPLATES = ['index']

# Top Menu Links
NAVLINKS = (
	('#page-top', ''),
	('index.html#portfolio', 'Projects'),
	('index.html#blog', 'Blog'),
)

# Portfolio Name
PORTFOLIO = 'Selected Projects'



#Contact form fields sorted by: label, input_type, id, required_validation_,msg
CONTACT_FIELDS = (
	['Name', 'text', 'name', 'Please enter your name.'],
	['Email Address', 'email', 'email','Please enter your email address.' ],
	['Phone Number', 'tel', 'phone', 'Please enter your phone number.'],
	['Message', 'textarea', 'message', 'Please enter a message.']
)


