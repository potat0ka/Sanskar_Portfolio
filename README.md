# Sanskar Shrestha Travel Consultant Portfolio

A professional Django-based portfolio website for Sanskar Shrestha, travel consultant at Harvest Moon Travels & Tours (P.) LTD. Features a stunning Three.js Earth globe animation and comprehensive travel services showcase.

## 🌟 Features

- **Interactive 3D Earth Globe**: Slow-rotating realistic Earth globe using Three.js, centered on Kathmandu, Nepal
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Professional Sections**:
  - About Me with professional bio and skills
  - 6 Travel Services with icons and descriptions
  - Top Destinations showcase with image cards
  - Who I Work With (persona-based client types)
  - CV Download functionality
  - Contact section with WhatsApp and Email integration
- **SEO Optimized**: Complete meta tags, OpenGraph, and Twitter Card support
- **Performance Optimized**: Modular CSS, minimal JavaScript, WhiteNoise static file serving

## 🛠 Tech Stack

- **Backend**: Django 5.2.3 (Python)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **3D Graphics**: Three.js for Earth globe animation
- **Styling**: Modular CSS architecture
  - `reset.css` - Browser normalization
  - `layout.css` - Grid systems and structural elements
  - `components.css` - Reusable UI components
  - `responsive.css` - Media queries and responsive design
- **Deployment**: Gunicorn + WhiteNoise for static files

## 📁 Project Structure

```
.
├── portfolio_project/          # Django project settings
│   ├── __init__.py
│   ├── settings.py            # Main Django settings
│   ├── urls.py                # URL configuration
│   ├── wsgi.py                # WSGI configuration
│   └── asgi.py                # ASGI configuration
├── portfolio/                  # Main Django app
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py              # Data models (currently unused)
│   ├── views.py               # View functions
│   ├── urls.py                # App URL patterns
│   └── admin.py               # Admin configuration
├── templates/                  # Django templates
│   ├── base.html              # Base template with meta tags
│   └── portfolio/
│       └── home.html          # Main portfolio page
├── static/                     # Static assets
│   ├── css/
│   │   ├── reset.css          # Browser reset styles
│   │   ├── layout.css         # Layout and grid systems
│   │   ├── components.css     # UI components
│   │   └── responsive.css     # Responsive design
│   ├── js/
│   │   └── main.js            # Three.js globe and interactions
│   ├── images/                # Image assets
│   └── files/                 # Downloadable files (CV)
├── media/                      # User uploaded files
├── manage.py                   # Django management script
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🚀 Setup Instructions

### Prerequisites

- Python 3.8+ installed
- Basic familiarity with Django

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sanskar-portfolio
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Collect static files**:
   ```bash
   python manage.py collectstatic --noinput
   ```

6. **Run the development server**:
   ```bash
   python manage.py runserver
   ```

7. **Visit the website**:
   Open `http://127.0.0.1:8000` in your browser

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### Static Files

- Development: Files served directly from `/static/` directory
- Production: Collected to `/staticfiles/` and served by WhiteNoise

### CV Download

Place the CV PDF file at: `static/files/sanskar_shrestha_cv.pdf`

## 🌐 Deployment

### GitHub Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to hosting platform**:
   - Heroku, Railway, or other Django-compatible platforms
   - Configure environment variables
   - Set up static file serving

## 🎨 Customization

### Color Scheme

The website uses a professional color palette defined in CSS custom properties:

- Primary Color: `#FFCB82` (Warm golden)
- Primary Text: `#381E05` (Dark brown)
- Dark Gradient: Space-themed dark background

### Content Updates

Edit content in `portfolio/views.py`:

- Services list
- Destinations showcase
- Client personas
- Contact information

## 📱 Responsive Breakpoints

- **Large Desktop**: 1400px+
- **Desktop**: 1200px+
- **Tablet Landscape**: 992px - 1199px
- **Tablet Portrait**: 768px - 991px
- **Mobile Landscape**: 576px - 767px
- **Mobile Portrait**: Up to 575px
- **Small Mobile**: Up to 375px

## 🔍 SEO Features

- Semantic HTML5 structure
- Complete meta tag implementation
- OpenGraph protocol support
- Twitter Card integration
- Proper heading hierarchy
- Alt text for all images
- Clean URL structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and belongs to Sanskar Shrestha / Harvest Moon Travels & Tours (P.) LTD.

## 🆘 Support

For technical issues or customization requests, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for authentic travel experiences in Nepal**
