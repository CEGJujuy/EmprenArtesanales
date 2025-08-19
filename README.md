# EmprenArtesanales

## Artisanal Production Management System

A comprehensive inventory and production management system designed specifically for small-scale artisanal producers. This application helps manage raw materials, track recipes, control production batches, and monitor finished product inventory with professional-grade features and an intuitive user interface.

## 🎯 Key Features

### Inventory Management
- **Raw Materials Tracking**: Monitor input quantities with automatic low-stock alerts
- **Finished Products Control**: Track completed product inventory levels
- **Real-time Stock Updates**: Automatic inventory adjustments during production
- **Stock Transaction History**: Complete audit trail of all inventory movements

### Recipe Management
- **Detailed Recipe Creation**: Define ingredients, quantities, and production instructions
- **Recipe Library**: Organize and manage all your production formulas
- **Ingredient Cost Calculation**: Track material costs per recipe
- **Production Yield Tracking**: Monitor expected vs actual output

### Batch Production
- **Production Planning**: Schedule and organize production runs
- **Batch Tracking**: Monitor production status from start to completion
- **Quality Control**: Record batch notes and production observations
- **Automatic Inventory Updates**: Real-time stock adjustments during production

### Analytics & Reporting
- **Production Dashboard**: Visual overview of key metrics and recent activity
- **Batch Reports**: Detailed production history with date filtering
- **Input Consumption Analysis**: Track material usage patterns
- **Stock Level Monitoring**: Visual charts of inventory trends
- **Cost Analysis**: Production cost tracking and profitability insights

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with email/password
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds

## 🏗 Database Architecture

The system uses a relational database with the following core tables:

- **Products**: Finished goods catalog
- **Inputs**: Raw materials and ingredients inventory
- **Recipes**: Production formulas with ingredient lists
- **Recipe Ingredients**: Junction table linking recipes to inputs
- **Batches**: Production run records
- **Batch Transactions**: Detailed production tracking
- **Stock Transactions**: Complete inventory movement history

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Database Setup**
   - Click "Connect to Supabase" in the application
   - Configure your Supabase project
   - Database schema will be automatically created

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials

4. **Start Development**
   ```bash
   npm run dev
   ```

## 📱 User Interface

The application features a clean, professional design with:
- **Large Visual Icons**: Easy navigation with clear visual cues
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Workflow**: Logical progression from inputs → recipes → production → reports
- **Real-time Updates**: Live inventory and production status
- **Professional Aesthetics**: Clean, modern interface suitable for business use

## 🎯 Target Users

Perfect for small-scale artisanal producers including:
- Craft food producers
- Artisanal beverage makers
- Handmade cosmetics creators
- Small-batch manufacturers
- Specialty product makers

## 📊 Business Benefits

- **Inventory Control**: Never run out of materials or overstock
- **Cost Management**: Track production costs and profitability
- **Quality Consistency**: Standardized recipes ensure consistent output
- **Production Planning**: Optimize batch sizes and scheduling
- **Compliance Ready**: Complete audit trail for regulatory requirements

## 🔒 Security Features

- **User Authentication**: Secure login system
- **Row Level Security**: Data isolation between users
- **Audit Trail**: Complete transaction history
- **Data Backup**: Automatic Supabase backups

---

## 👨‍💼 Developer Information

**Professional**: César Eduardo González  
**Email**: gonzalezeduardo_31@hotmail.com  
**Cell**: +54 93884 858-907

---

*Built with modern web technologies for reliable, scalable artisanal production management.*