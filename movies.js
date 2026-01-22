// ============================================
// Movies Data (Hardcoded for Demo)
// ============================================

const moviesData = [
    {
        id: 'dark-knight',
        title: 'The Dark Knight',
        poster: 'https://i.pinimg.com/1200x/5f/fe/79/5ffe79003530da912a82acac80be1426.jpg',
        thumbnail: 'https://i.pinimg.com/1200x/5f/fe/79/5ffe79003530da912a82acac80be1426.jpg',
        rating: 4.8,
        genres: ['Action', 'Crime', 'Drama'],
        duration: 152,
        year: 2008,
        language: ['English', 'Hindi'],
        synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
        status: 'now-showing',
        trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY',
        releaseDate: '2008-07-18'
    },
    {
        id: 'inception',
        title: 'Inception',
        poster: 'https://i.pinimg.com/1200x/5c/e3/5a/5ce35a87a0a4e2682eb622fceaef503e.jpg',
        thumbnail: 'https://i.pinimg.com/1200x/5c/e3/5a/5ce35a87a0a4e2682eb622fceaef503e.jpg',
        rating: 4.7,
        genres: ['Action', 'Sci-Fi', 'Thriller'],
        duration: 148,
        year: 2010,
        language: ['English', 'Hindi'],
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
        status: 'now-showing',
        trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
        releaseDate: '2010-07-16'
    },
    {
        id: 'interstellar',
        title: 'Interstellar',
        poster: 'https://i.pinimg.com/736x/13/77/12/137712139f096d4112acc6275f8e1f47.jpg',
        thumbnail: 'https://i.pinimg.com/736x/13/77/12/137712139f096d4112acc6275f8e1f47.jpg',
        rating: 4.9,
        genres: ['Adventure', 'Drama', 'Sci-Fi'],
        duration: 169,
        year: 2014,
        language: ['English', 'Hindi'],
        synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
        status: 'now-showing',
        trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
        releaseDate: '2014-11-07'
    },
    {
        id: 'ramayana',
        title: 'Ramayana: The Epic',
        poster: 'https://i.pinimg.com/1200x/95/ed/12/95ed12e62bf63bf5bbe9c9fc815cd87c.jpg',
        thumbnail: 'https://i.pinimg.com/1200x/95/ed/12/95ed12e62bf63bf5bbe9c9fc815cd87c.jpg',
        rating: null,
        genres: ['Animation', 'Action', 'Adventure'],
        duration: 100,
        year: 2025,
        language: ['Hindi', 'Tamil', 'Telugu'],
        synopsis: 'An upcoming epic retelling of the Ramayana.',
        cast: ['Ranbir Kapoor', 'Sai Pallavi', 'Yash'],
        status: 'upcoming',
        trailer: 'https://www.youtube.com/embed/8HiWKbDTc7w',
        releaseDate: '8 November 2026'
    },
    {
        id: 'toxic',
        title: 'Toxic',
        poster: 'https://i.pinimg.com/736x/a5/c4/6c/a5c46c99152650189452c6e23fb1311c.jpg',
        thumbnail: 'https://i.pinimg.com/736x/a5/c4/6c/a5c46c99152650189452c6e23fb1311c.jpg',
        rating: null,
        genres: ['Action', 'Drama'],
        duration: 0,
        year: 2025,
        language: ['Kannada', 'Hindi', 'Tamil'],
        synopsis: 'A fairytale for grown-ups.',
        cast: ['Yash'],
        status: 'upcoming',
        trailer: 'https://www.youtube.com/embed/aF08WVSvCok',
        releaseDate: '19 March 2026'
    }
];

const theatersData = [
    {
        id: 'pvr-icon',
        name: 'PVR ICON: Pavilion',
        address: 'The Pavilion Mall, SB Road, Pune',
        amenities: ['Recliner', 'Food Court', 'Parking', 'Dolby Atmos'],
        pricing: { regular: 250, premium: 450 },
        screens: [
            { id: 'screen1', name: 'Screen 1', showtimes: ['10:00 AM', '01:30 PM', '05:00 PM', '09:00 PM'] }
        ]
    },
    {
        id: 'cinepolis',
        name: 'Cinepolis: WestEnd',
        address: 'WestEnd Mall, Aundh, Pune',
        amenities: ['Recliner', 'WiFi', 'Parking', 'IMAX'],
        pricing: { regular: 220, premium: 400 },
        screens: [
            { id: 'screen1', name: 'Audi 1', showtimes: ['11:00 AM', '02:30 PM', '06:00 PM', '10:00 PM'] }
        ]
    },
    {
        id: 'inox',
        name: 'INOX: Bund Garden',
        address: 'Bund Garden Road, Pune',
        amenities: ['Food Court', 'Parking'],
        pricing: { regular: 180, premium: 350 },
        screens: [
            { id: 'screen1', name: 'Screen 1', showtimes: ['09:30 AM', '12:30 PM', '04:00 PM', '08:00 PM'] }
        ]
    }
];

// ============================================
// Helper Functions (Mocking Async)
// ============================================

async function fetchMovies() {
    return new Promise(resolve => {
        setTimeout(() => {
            const storedMovies = JSON.parse(localStorage.getItem('custom_movies') || '[]');
            const deletedIds = JSON.parse(localStorage.getItem('deleted_movie_ids') || '[]');

            const allMovies = [...storedMovies, ...moviesData];
            const activeMovies = allMovies.filter(m => !deletedIds.includes(m.id));

            resolve(activeMovies);
        }, 100);
    });
}

async function fetchMovieById(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            const storedMovies = JSON.parse(localStorage.getItem('custom_movies') || '[]');
            const deletedIds = JSON.parse(localStorage.getItem('deleted_movie_ids') || '[]');

            const allMovies = [...storedMovies, ...moviesData];
            // Even if we fetch by ID, check if it's deleted (optional, but good for direct links)
            if (deletedIds.includes(id)) {
                resolve(null);
                return;
            }

            const movie = allMovies.find(m => m.id === id);
            resolve(movie || moviesData[0]); // Fallback for safety
        }, 100);
    });
}

async function fetchTheaters() {
    return new Promise(resolve => {
        setTimeout(() => resolve(theatersData), 100);
    });
}

// Global wrappers expected by index.html / script.js
async function getMovieById(id) {
    return await fetchMovieById(id);
}

async function getAllMovies() {
    return await fetchMovies();
}

async function getNowShowingMovies() {
    const movies = await fetchMovies();
    return movies.filter(movie => movie.status === 'now-showing');
}

async function getUpcomingMovies() {
    const movies = await fetchMovies();
    return movies.filter(movie => movie.status === 'upcoming');
}

async function getTheaterById(id) {
    const theaters = await fetchTheaters();
    return theaters.find(theater => theater.id === id) || theaters[0];
}

async function getAllTheaters() {
    return await fetchTheaters();
}
