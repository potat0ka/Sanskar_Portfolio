"""
Portfolio views for Sanskar Shrestha Travel Consultant
"""
from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.conf import settings
import os

def home(request):
    """
    Main portfolio home page
    """
    context = {
        'title': 'Sanskar Shrestha - Travel Consultant | Harvest Moon Travels',
        'meta_description': 'Professional travel consultant Sanskar Shrestha at Harvest Moon Travels & Tours. Expert travel planning, destination consulting, and personalized travel experiences in Nepal and beyond.',
        'contact_number': '+977-9700342200',
        'company_name': 'Harvest Moon Travels & Tours (P.) LTD',
        'services': [
            {
                'title': 'Trekking & Hiking',
                'description': 'Expert guided treks through Nepal\'s majestic mountains including Everest, Annapurna, and Langtang regions.',
                'icon': 'fas fa-mountain'
            },
            {
                'title': 'Cultural Tours',
                'description': 'Immersive cultural experiences exploring Nepal\'s rich heritage, temples, and traditional communities.',
                'icon': 'fas fa-temple'
            },
            {
                'title': 'Adventure Sports',
                'description': 'Thrilling adventures including white-water rafting, paragliding, bungee jumping, and jungle safaris.',
                'icon': 'fas fa-parachute-box'
            },
            {
                'title': 'Pilgrimage Tours',
                'description': 'Sacred journeys to holy sites including Lumbini, Muktinath, and other spiritual destinations.',
                'icon': 'fas fa-pray'
            },
            {
                'title': 'Wildlife Safari',
                'description': 'Exciting wildlife experiences in Chitwan and Bardia National Parks with expert naturalist guides.',
                'icon': 'fas fa-binoculars'
            },
            {
                'title': 'Luxury Travel',
                'description': 'Premium travel experiences with luxury accommodations, private tours, and VIP services.',
                'icon': 'fas fa-crown'
            }
        ],
        'destinations': [
            {
                'name': 'Everest Base Camp',
                'description': 'World\'s highest peak base camp trek',
                'image': 'destinations/everest.jpg'
            },
            {
                'name': 'Annapurna Circuit',
                'description': 'Classic Himalayan trekking route',
                'image': 'destinations/annapurna.jpg'
            },
            {
                'name': 'Kathmandu Valley',
                'description': 'UNESCO World Heritage cultural sites',
                'image': 'destinations/kathmandu.jpg'
            },
            {
                'name': 'Pokhara Lakes',
                'description': 'Serene lakeside mountain views',
                'image': 'destinations/pokhara.jpg'
            },
            {
                'name': 'Chitwan National Park',
                'description': 'Wildlife safari and jungle activities',
                'image': 'destinations/chitwan.jpg'
            },
            {
                'name': 'Lumbini',
                'description': 'Birthplace of Lord Buddha',
                'image': 'destinations/lumbini.jpg'
            }
        ],
        'personas': [
            {
                'title': 'Adventure Seekers',
                'description': 'Thrill-seekers looking for challenging treks, extreme sports, and adrenaline-pumping experiences in Nepal\'s rugged terrain.',
                'icon': 'fas fa-hiking'
            },
            {
                'title': 'Cultural Enthusiasts',
                'description': 'Travelers passionate about history, art, and traditions seeking authentic cultural immersion and heritage exploration.',
                'icon': 'fas fa-theater-masks'
            },
            {
                'title': 'Spiritual Pilgrims',
                'description': 'Spiritual seekers on journeys of self-discovery, meditation retreats, and visits to sacred Buddhist and Hindu sites.',
                'icon': 'fas fa-peace'
            },
            {
                'title': 'Luxury Travelers',
                'description': 'Discerning travelers who prefer premium accommodations, private guides, and exclusive experiences with comfort and elegance.',
                'icon': 'fas fa-gem'
            }
        ]
    }
    return render(request, 'portfolio/home.html', context)

def download_cv(request):
    """
    Download CV functionality
    """
    cv_path = os.path.join(settings.STATIC_ROOT or settings.STATICFILES_DIRS[0], 'files', 'sanskar_shrestha_cv.pdf')
    
    if os.path.exists(cv_path):
        with open(cv_path, 'rb') as cv_file:
            response = HttpResponse(cv_file.read(), content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="Sanskar_Shrestha_CV.pdf"'
            return response
    else:
        raise Http404("CV file not found")
