import Footer from '@/components/Footer'

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <Footer />
    </div>
  )
}