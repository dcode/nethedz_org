from fabric.api import *
import os
import fabric.contrib.project as project

PROD = ['nethedz@nethedz.webfactional.com',]
DEST_PATH = '/home/nethedz/webapps/nethedz_org/html'
ROOT_PATH = os.path.abspath(os.path.dirname(__file__))
DEPLOY_PATH = os.path.join(ROOT_PATH, 'deploy')

def clean():
    """ Go to the root directory """
    with lcd( ROOT_PATH ):
        """ Remove generated files """
        local('rm -rf ./deploy')
        """ Remove temporary files """
        local('find . \( -iname \*.pyc -o -name \*~ -o -name .DS_Store \) -delete')

def generate():
    """ Go to the root directory """
    with lcd( ROOT_PATH ):
        local('hyde -g -s .')

def regen():
    clean()
    generate()

def serve():
    """ Go to the root directory """
    with lcd( ROOT_PATH ):
        local('hyde -w -s . -k')

def reserve():
    regen()
    serve()

def smush():
    """ Go to the root directory """
    with lcd( ROOT_PATH ):
        local('smusher ./media/images')

@hosts(PROD)
def publish():
    regen()
    project.rsync_project(
        remote_dir=DEST_PATH,
        local_dir=DEPLOY_PATH.rstrip('/') + '/',
        delete=True
    )
