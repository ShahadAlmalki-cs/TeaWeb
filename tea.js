document.addEventListener("DOMContentLoaded", () => {
    
    const teas = {
        lavender: {
            title: "شاي اللافندر",
            story: "كوب من هدوء البنفسج, يسرقك من ضجيج العالم ليغمر روحك بالسكينة والسلام.",
            benefits: ["يساعد على النوم العميق", "يهدئ الأعصاب", "يخفف التوتر"]
        },
        peach: {
            title: "شاي الخوخ",
            story: "كوب دافئ يفيض بعبير بساتين الخوخ, يمنحك لحظة من الترف الهادئ.",
            benefits: ["يحسن الهضم", "غني بالفيتامينات", "يعزز نضارة البشرة"]
        },
        berry: {
            title: "شاي التوت",
            story: "كوب بلون الياقوت, يمنحك مزيج من الحيوية والدفئ في رشفة واحدة.",
            benefits: ["مضاد للأكسدة", "يقوي المناعة", "يعطي طاقة طبيعية"]
        },
        green: {
            title: "الشاي الأخضر",
            story: "كوب من نقاء الطبيعة, يمنحك طاقة تتنفس بالصفاء.",
            benefits: ["يزيد التركيز", "ينقي الجسم", "يطرد السموم"]
        }
    };

    if (window.lucide) lucide.createIcons();

    gsap.set(".tea-card", { x: 50 });

    const tl = gsap.timeline();
    tl.from(".hero h1", { y: -30, opacity: 0, duration: 1 })
      .from(".hero p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
      // الآن نجعلها تظهر وتتحرك لمكانها الطبيعي
      .to(".tea-card", { 
          opacity: 1, 
          x: 0, 
          stagger: 0.2, 
          duration: 0.8, 
          ease: "power2.out"
      }, "-=0.3")
      .to(".back-link", { opacity: 0.7, duration: 1, ease: "power2.out" }, "-=0.5");
      
    
    const modal = document.getElementById("teaModal");
    const modalContent = document.querySelector(".modal-content");

    document.querySelectorAll(".tea-card").forEach(card => {
        card.addEventListener("click", () => {
            const data = teas[card.dataset.tea];
            if (!data) return;

            document.getElementById("teaTitle").textContent = data.title;
            document.getElementById("teaStory").textContent = data.story;
            
            const list = document.getElementById("teaBenefits");
            list.innerHTML = "";
            data.benefits.forEach(b => {
                const li = document.createElement("li");
                li.textContent = "✦ " + b;
                list.appendChild(li);
            });

            modal.style.display = "flex";
            gsap.fromTo(modalContent, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 });
        });
    });

    document.querySelector(".close-btn").onclick = () => {
        gsap.to(modalContent, { 
            scale: 0.8,  
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => modal.style.display = "none" 
        });
    };
});


