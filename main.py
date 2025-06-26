"""
Main entry point for Django portfolio website
Compatible with both development and production deployment
"""
import os
from portfolio_project.wsgi import application

# For production WSGI servers
app = application

if __name__ == '__main__':
    # For development server
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
    from django.core.management import execute_from_command_line
    import sys
    execute_from_command_line(sys.argv)