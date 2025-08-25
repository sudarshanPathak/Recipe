export default function ThankYouPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Thank you for your order!</h1>
      <p className="text-gray-700">A receipt has been sent to your email.</p>
      <a href="/products" className="inline-block mt-6 px-6 py-3 bg-black text-white rounded">Continue Shopping</a>
    </div>
  )
}

