import os
import sys 

ROOT_PATH = os.path.abspath(os.path.dirname(__file__))
sys.path = [ROOT_PATH] + sys.path

import hydeengine
HYDE_FOLDER = os.path.dirname(os.path.dirname(hydeengine.__file__))

LAYOUT_DIR = os.path.join(ROOT_PATH, 'layout')
CONTENT_DIR = os.path.join(ROOT_PATH, 'content')
MEDIA_DIR = os.path.join(ROOT_PATH, 'media')
DEPLOY_DIR = os.path.join(ROOT_PATH, 'deploy')
TMP_DIR = os.path.join(ROOT_PATH, 'deploy_tmp')
BACKUPS_DIR = os.path.join(ROOT_PATH, 'backups')

NOTIFY="/usr/bin/notify-send"

BACKUP = False
DEBUG = True

SITE_ROOT = "/"
SITE_WWW_URL = "http://nethedz.org"
SITE_NAME = "Digital Divagation"
SITE_AUTHOR = "Derek Ditch"

GENERATE_ABSOLUTE_FS_URLS = False
GENERATE_CLEAN_URLS = True
LISTING_PAGE_NAMES = ['index']
APPEND_SLASH = True

# {folder : extension : (processors)}
# The processors are run in the given order and are chained.
# Only a lone * is supported as an indicator for folders. Path
# should be specified. No wildcard card support yet.

# Starting under the media folder. For example, if you have media/css under
# your site root,you should specify just css. If you have media/css/ie you
# should specify css/ie for the folder name. css/* is not supported (yet).

# Extensions do not support wildcards.

MEDIA_PROCESSORS = {
    '*': {
        '.less': ('hydeengine.media_processors.LessCSS',),
        '.js': ('hydeengine.media_processors.TemplateProcessor',
                'hydeengine.media_processors.YUICompressor',)
    },
    'images/': {
        '.png': ('hydeengine.media_processors.Thumbnail',),
        '.jpg': ('hydeengine.media_processors.Thumbnail',),
    }
}

CONTENT_PROCESSORS = {}

CATEGORIES = {
    'coding': {
        'description': 'Code is poetry. Get lost in it.'
    }
}


SITE_PRE_PROCESSORS = {
    '/': {
        'hydeengine.site_pre_processors.NodeInjector' : {
            'variable': 'blog_node',
            'path': 'content/blog',
        },
    },
    'blog': {
        'hydeengine.site_pre_processors.CategoriesManager' : {
            'node': 'blog', 
            'template': '_archives.html', 
            'output_folder': 'archives', 
            'listing_template': '_archives_index.html',
        },
    },
}

SITE_POST_PROCESSORS = {
    '/': {
        'hydeengine.site_post_processors.GoogleSitemapGenerator':
        {
            'sitemap_file': DEPLOY_DIR + '/sitemap.xml',
            'generator': HYDE_FOLDER + '/lib/sitemap_gen-1.4/sitemap_gen.py',

            }
        }
    # 'media/js': {
    #        'hydeengine.site_post_processors.FolderFlattener' : {
    #                'remove_processed_folders': True,
    #                'pattern':"*.js"
    #        }
    #    }
}

CONTEXT = {
    'GENERATE_CLEAN_URLS': GENERATE_CLEAN_URLS,
    'links': {
        'python': 'http://python.org/',
        'django': 'http://www.djangoproject.com/',
        'cherrypy': 'http://cherrypy.org/',
        'hyde': 'http://github.com/lakshmivyas/hyde/',
        'markdown': 'http://daringfireball.net/projects/markdown/',
        'fabric': 'http://fabfile.org/',
        'blatter': 'http://bitbucket.org/jek/blatter/',
        'webfaction': 'http://www.webfaction.com?affiliate=sjl',
        'mercurial': 'http://mercurial.selenic.com/',
        'git': 'http://git-scm.com/',
        'aardvarklegs': 'http://fecklessmind.com/2009/01/20/aardvark-css-framework/',
        'hgtip': 'http://hgtip.com/',
        'lesscss': 'http://lesscss.org/',
        'bitbucket': 'http://bitbucket.org/',
        'github': 'http://github.com/',
    },
}

FILTER = {
    'include': (".htaccess",),
    'exclude': (".*","*~")
}


# Processor Configuration

YUI_COMPRESSOR = os.path.join(ROOT_PATH, 'yuicompressor-2.4.2.jar')
HSS_PATH = None # if you don't want to use HSS
LESS_CSS_PATH = '/usr/bin/lessc'
THUMBNAIL_MAX_WIDTH = 1400000000
THUMBNAIL_MAX_HEIGHT = 100
THUMBNAIL_FILENAME_POSTFIX = '-thumb'

# Django settings

TEMPLATE_DIRS = (LAYOUT_DIR, CONTENT_DIR, TMP_DIR, MEDIA_DIR)
INSTALLED_APPS = (
    'hydeengine',
    'django.contrib.webdesign',
    'extensions',
)
