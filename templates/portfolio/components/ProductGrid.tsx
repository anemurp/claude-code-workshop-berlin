const products = [
  { name: "Reading Labs", src: "/assets/ReadingLabs.png", href: "https://www.mheducation.com/prek-12/program/microsites/MKTSP-UEC12M0/browse/digital" },
  { name: "Wonders", src: "/assets/Wonders.png", href: "https://www.youtube.com/watch?v=QomwSYMLWHg" },
  { name: "Building Blocks", src: "/assets/buildingblocks.png", href: "https://www.mheducation.com/prek-12/program/building-blocks-prek-math-2025/MKTSP-TMB03M02.html?srsltid=AfmBOoosJp-Al-QfKZDYyv5NO5NH-L1-l79oaOShJH15fCmCD22FNuYt" },
  { name: "New Lit", src: "/assets/McGrawHill.png", href: "https://www.mheducation.com/prek-12/resources/mcgrawhill-plus.html?srsltid=AfmBOooPnKHK5VWNm6Iewc9hOzvJmFXUVmALQn5OSa3OUWkV_zxR-iaa" },
  { name: "ProFile", src: "/assets/profile.png", href: "https://profileaestheticmanagement.com/" },
  { name: "CoTeacher AI", src: "/assets/products/coteacher.png", large: true, href: "https://www.linkedin.com/company/coteacher/posts/?feedView=all" },
  { name: "Emerge", src: "/assets/Emerge.png", href: "https://www.mheducation.com/prek-12/program/microsites/MKTSP-BGF02M0.html?srsltid=AfmBOoqdvPLbOxdqpXXP5eALjk0HR06G8xqJw5-Vu7SOs86LJlRSoPNe" },
  { name: "Summit", src: "/assets/Summit.png", href: "https://www.mheducation.com/prek-12/program/microsites/MKTSP-RNL01M01.html?srsltid=AfmBOoo_4lKJjs9cE6glgN5Vti3WxECAJv4ruQEmqdSrIDYp4VgZ1hs7" },
];

export function ProductGrid() {
  return (
    <section className="mt-16 border-t border-ink/10 pt-10">
      <h2 className="text-2xl font-bold">Products I've shipped</h2>
      <p className="mt-2 text-ink/75">
        From K-12 platforms used by millions, to healthcare SaaS, to my own AI startup.
      </p>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => {
          const tileClass = "flex items-center justify-center rounded-xl bg-ink/5 border border-ink/10 shadow-sm p-5 h-[90px] transition-all duration-200 hover:scale-105 hover:shadow-md";
          const img = (
            <img
              src={product.src}
              alt={product.name}
              className={`object-contain max-w-full w-auto ${product.large ? "max-h-[80px]" : "max-h-[60px]"}`}
            />
          );
          return product.href ? (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className={tileClass}
            >
              {img}
            </a>
          ) : (
            <div key={product.name} className={`${tileClass} cursor-default`}>
              {img}
            </div>
          );
        })}
      </div>
    </section>
  );
}
