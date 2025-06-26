from flask import render_template, send_from_directory, abort
from app import app
import os

@app.route('/')
def index():
    """
    Main portfolio page route
    Renders the complete portfolio website
    """
    return render_template('index.html')

@app.route('/download-cv')
def download_cv():
    """
    Route to download Sanskar's CV
    Serves the PDF file from static assets
    """
    try:
        return send_from_directory(
            directory=os.path.join(app.root_path, 'static/assets'),
            path='cv-sanskar-shrestha.pdf',
            as_attachment=True,
            download_name='Sanskar_Shrestha_CV.pdf'
        )
    except FileNotFoundError:
        abort(404)

@app.errorhandler(404)
def not_found_error(error):
    """
    Handle 404 errors gracefully
    """
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_error(error):
    """
    Handle 500 errors gracefully
    """
    return render_template('index.html'), 500
