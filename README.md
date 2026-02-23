# Event Companion Microsite

A mobile-first web application that provides event attendees with personalized itineraries and activity details. Each event gets its own custom-designed microsite while maintaining consistent functionality across all events.

## 🎯 Overview

The Event Companion Microsite is designed to enhance the event experience by providing attendees with:

- **Personalized Registration**: Easy event registration process
- **Custom Itineraries**: Tailored schedules based on attendee preferences
- **Activity Details**: Comprehensive information about each event activity
- **Mobile-First Design**: Optimized for mobile devices with responsive design
- **Event-Specific Branding**: Custom design for each event while maintaining consistent functionality

## ✨ Features

- 📱 **Mobile-First Responsive Design**
- 🎨 **Custom Event Branding** - Each event gets its own design theme
- 📋 **Personalized Itineraries** - Tailored schedules for each attendee
- 🔍 **Activity Details** - Comprehensive information about events and activities
- 📝 **Registration System** - Streamlined attendee registration
- ⚡ **Fast Performance** - Built with Next.js for optimal speed
- 🎯 **Progressive Web App** - Works offline and provides app-like experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: Custom React components
- **Development**: ESLint for code quality

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd event-companion-microsite
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
event-companion-microsite/
├── public/                 # Static assets
│   ├── assets/            # Images, icons, and other assets
│   └── ...
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Home page
│   │   └── ...
│   ├── components/        # Reusable React components
│   │   ├── common/        # Common UI components
│   │   ├── reusable/      # Reusable components
│   │   └── section/       # Section-specific components
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # Global styles and CSS
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎨 Customization

### Event-Specific Branding

Each event microsite can be customized with:

- Custom color schemes
- Event-specific logos and branding
- Tailored typography
- Custom layouts and components

### Configuration

Event-specific configurations can be managed through:

- Environment variables
- Configuration files
- Dynamic theming system

## 📱 Mobile-First Design

The application is built with mobile devices as the primary target:

- Responsive design that works on all screen sizes
- Touch-friendly interface elements
- Optimized performance for mobile networks
- Progressive Web App capabilities

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```

### Deployment Platforms

The application can be deployed on:

- [Vercel](https://vercel.com/) (recommended for Next.js)
- [Netlify](https://netlify.com/)
- Any platform that supports Node.js applications

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for amazing event experiences**
