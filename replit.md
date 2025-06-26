# Replit.md - Sanskar Shrestha Travel Consultant Portfolio

## Overview

This is a professional portfolio website for Sanskar Shrestha, a travel consultant at Harvest Moon Travels & Tours (P.) LTD. The application is built using Flask as the backend framework with a modern, responsive frontend featuring interactive elements and professional design optimized for the travel industry.

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Template Engine**: Jinja2 for dynamic content rendering
- **Application Structure**: 
  - `app.py`: Flask application factory and configuration
  - `main.py`: Application entry point for production deployment
  - `routes.py`: Route definitions and request handling
  - Modular design following Flask best practices

### Frontend Architecture
- **Template System**: Jinja2 templates with inheritance
  - `base.html`: Base template with common structure
  - `index.html`: Main portfolio page extending base template
- **Styling**: Modular CSS architecture
  - `reset.css`: Browser normalization
  - `layout.css`: Grid systems, containers, and structural elements
  - `components.css`: Reusable UI components
  - `responsive.css`: Media queries and responsive design
- **JavaScript**: Vanilla JavaScript for optimal performance
  - Smooth scrolling navigation
  - Interactive globe animation
  - Scroll-triggered animations
  - Contact form enhancements

### Design System
- **Typography**: Inter (body text) and Playfair Display (headings)
- **Color Scheme**: Professional blue palette with CSS custom properties
- **Components**: Bootstrap 5 for responsive grid and components
- **Icons**: Font Awesome for consistent iconography
- **Animations**: CSS and JavaScript-powered interactions

## Key Components

### 1. Portfolio Sections
- **Hero Section**: Full-screen landing with animated globe and call-to-action
- **About Me**: Professional background showcase
- **Services**: Travel consultation offerings
- **Destination Highlights**: Featured destinations
- **CV Download**: Direct PDF download functionality
- **Contact Section**: WhatsApp and email integration

### 2. Interactive Elements
- **Animated Globe**: SVG-based Earth globe with CSS animations
- **Smooth Scrolling**: Navigation between sections
- **Responsive Design**: Mobile-first approach with breakpoints
- **Performance Optimizations**: Lazy loading and optimized assets

### 3. SEO and Metadata
- Complete meta tag implementation
- OpenGraph and Twitter Card support
- Semantic HTML structure
- Accessibility features

## Data Flow

### Request Handling
1. Client requests are received by Flask application
2. Routes are processed in `routes.py`
3. Templates are rendered using Jinja2
4. Static assets (CSS, JS, images) are served directly

### Key Routes
- `/`: Main portfolio page rendering
- `/download-cv`: CV file download with proper headers
- Error handlers for 404 and 500 responses

### Asset Management
- Static files organized in `/static` directory
- CSS files modularly organized for maintainability
- JavaScript bundled in single file for performance
- SVG graphics for scalable imagery

## External Dependencies

### Python Dependencies
- **Flask**: Web framework (>=3.1.1)
- **Flask-SQLAlchemy**: Database ORM (>=3.1.1) - prepared for future database integration
- **Gunicorn**: WSGI HTTP Server for production (>=23.0.0)
- **psycopg2-binary**: PostgreSQL adapter (>=2.9.10) - prepared for future database needs
- **email-validator**: Email validation utilities (>=2.2.0)

### Frontend Dependencies (CDN)
- **Bootstrap 5**: Responsive CSS framework
- **Font Awesome**: Icon library
- **Google Fonts**: Web typography (Inter, Playfair Display)

### Development Tools
- **UV**: Python package management
- **Nix**: Development environment management
- **PostgreSQL**: Database system (configured but not actively used)

## Deployment Strategy

### Production Configuration
- **Server**: Gunicorn WSGI server
- **Port**: 5000 (configurable)
- **Host**: 0.0.0.0 for external access
- **Deployment Target**: Autoscale deployment on Replit
- **Environment**: Production-ready with proper error handling

### Development Setup
- **Debug Mode**: Enabled for development
- **Hot Reload**: Automatic restart on file changes
- **Logging**: Configured for debugging
- **Static File Serving**: Flask development server for local assets

### Security Considerations
- Session secret key management
- Error handling without information disclosure
- Static file access controls
- XSS protection through template escaping

## Changelog
- June 26, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.