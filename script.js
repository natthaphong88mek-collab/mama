let currentSlide = 1;
    const totalSlides = 12;
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progress-bar');
    const slideSelect = document.getElementById('slide-select');
    const slideNumIndicator = document.getElementById('slide-num-indicator');

    function updateSlide() {
      slides.forEach(s => s.classList.remove('active'));
      const activeSlide = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
      if (activeSlide) {
        activeSlide.classList.add('active');
      }

      // Update HUD indicators
      const progressPercent = (currentSlide / totalSlides) * 100;
      progressBar.style.width = `${progressPercent}%`;
      slideSelect.value = currentSlide;
      slideNumIndicator.innerText = `${String(currentSlide).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    }

    function nextSlide() {
      if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
      }
    }

    function prevSlide() {
      if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
      }
    }

    function goToSlide(n) {
      if (n >= 1 && n <= totalSlides) {
        currentSlide = n;
        updateSlide();
      }
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        window.print();
      }
    });

    /* ==========================================================
       DATA BOOMING LIVE INTERACTIVE ENGINE
       ========================================================== */
    const boomingData = [
      { id: "c1", label: "🌿 ฟ้าทะลายโจร", category: "วัฒนธรรม & ภูมิปัญญา", era: "รัตนโกสินทร์", takeaway: "สาร Andrographolide ช่วยยับยั้งการแบ่งตัวของไวรัสทางเดินหายใจ", angle: 0, dist: 135 },
      { id: "c2", label: "🔬 สารแอนโดรกราโฟไลด์", category: "วิทยาศาสตร์", era: "ปัจจุบัน", takeaway: "งานวิจัยระดับโมเลกุลยืนยันประสิทธิภาพในการลดไข้และต้านการอักเสบ", angle: 45, dist: 130 },
      { id: "c3", label: "🍲 เครื่องแกงต้มยำ", category: "อาหารเพื่อสุขภาพ", era: "อยุธยา", takeaway: "สมุนไพรสด 5 ชนิดให้สารต้านอนุมูลอิสระสูงกว่าอาหารทั่วไป 3 เท่า", angle: 90, dist: 135 },
      { id: "c4", label: "📜 ตำราแพทย์ศาสตร์สงเคราะห์", category: "ประวัติศาสตร์", era: "ร.5 (1870)", takeaway: "บันทึกคลังเวชศาสตร์โบราณที่ถอดรหัสสู่ฐานข้อมูลดิจิทัล", angle: 135, dist: 130 },
      { id: "c5", label: "🧬 ขมิ้นชัน & Curcumin", category: "เทคโนโลยีการแพทย์", era: "ปัจจุบัน", takeaway: "นาโนเทคโนโลยีช่วยเพิ่มการดูดซึมเคอร์คูมินได้ถึง 20 เท่า", angle: 180, dist: 135 },
      { id: "c6", label: "🍃 ชุมชนปลูกสมุนไพรอินทรีย์", category: "เศรษฐกิจชุมชน", era: "ปัจจุบัน", takeaway: "สร้างมูลค่าเพิ่มให้เกษตรกรไทยกว่า 4,000 ล้านบาทต่อปี", angle: 225, dist: 130 },
      { id: "c7", label: "🌱 นวดแผนไทย & กายวิภาค", category: "ภูมิปัญญาบำบัด", era: "จารึกวัดโพธิ์", takeaway: "ศาสตร์การยืดกล้ามเนื้อและคลายผังผืดตรงกับหลักเวชศาสตร์ฟื้นฟู", angle: 270, dist: 135 },
      { id: "c8", label: "📱 แอปพลิเคชันหมอยาไทย AI", category: "นวัตกรรมดิจิทัล", era: "2026", takeaway: "AI ช่วยแนะนำการใช้สมุนไพรตามอาการและเตือนการแพ้ยา", angle: 315, dist: 130 }
    ];

    let isBoomed = false;

    function triggerBooming() {
      if (isBoomed) return;
      isBoomed = true;

      const area = document.getElementById('booming-area');
      const svg = document.getElementById('booming-svg');
      const countEl = document.getElementById('booming-count');
      const centerNode = document.getElementById('booming-center');
      
      const rect = area.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Pulse ring animation
      const ring = document.createElement('div');
      ring.style.position = 'absolute';
      ring.style.width = '100px';
      ring.style.height = '100px';
      ring.style.borderRadius = '50%';
      ring.style.border = '2px solid var(--gr-lime)';
      ring.style.boxShadow = '0 0 30px var(--gr-lime)';
      ring.style.left = `${cx - 50}px`;
      ring.style.top = `${cy - 50}px`;
      ring.style.pointerEvents = 'none';
      ring.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      ring.style.transform = 'scale(1)';
      ring.style.opacity = '1';
      area.appendChild(ring);

      setTimeout(() => {
        ring.style.transform = 'scale(3)';
        ring.style.opacity = '0';
        setTimeout(() => ring.remove(), 600);
      }, 50);

      // Stagger burst 40ms per node
      let connections = 0;
      boomingData.forEach((item, index) => {
        setTimeout(() => {
          const rad = (item.angle * Math.PI) / 180;
          const targetX = cx + item.dist * Math.cos(rad);
          const targetY = cy + item.dist * Math.sin(rad);

          // Create SVG connection line
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', cx);
          line.setAttribute('y1', cy);
          line.setAttribute('x2', targetX);
          line.setAttribute('y2', targetY);
          line.setAttribute('stroke', '#00BBD4');
          line.setAttribute('stroke-width', '1.5');
          line.setAttribute('stroke-dasharray', '4, 3');
          line.setAttribute('class', 'booming-connection-line');
          svg.appendChild(line);

          // Create child node
          const node = document.createElement('div');
          node.className = 'booming-child-node';
          node.id = `child-${item.id}`;
          node.innerHTML = `<span>${item.label}</span>`;
          node.style.left = `${cx}px`;
          node.style.top = `${cy}px`;
          node.style.transform = 'translate(-50%, -50%) scale(0)';
          node.style.opacity = '0';
          area.appendChild(node);

          // Animate outward
          requestAnimationFrame(() => {
            node.style.left = `${targetX}px`;
            node.style.top = `${targetY}px`;
            node.style.transform = 'translate(-50%, -50%) scale(1)';
            node.style.opacity = '1';
          });

          // Click on child to update HUD card
          node.onclick = () => selectNode(item);

          connections++;
          countEl.innerText = connections;
        }, index * 40);
      });
    }

    function selectNode(item) {
      document.getElementById('specimen-code-label').innerHTML = `SPECIMEN: <strong>GRM-2026-${item.id.toUpperCase()}</strong> | ${item.era}`;
      document.getElementById('node-title').innerText = item.label;
      document.getElementById('node-desc').innerText = `หมวดหมู่: ${item.category} | ยุคสมัย: ${item.era}. ถอดรหัสและเชื่อมโยงสู่ฐานข้อมูลความรู้เรียบร้อยแล้ว`;
      document.getElementById('node-takeaway').innerText = item.takeaway;

      // Glow child
      document.querySelectorAll('.booming-child-node').forEach(n => {
        n.style.background = '#FFFFFF';
        n.style.borderColor = 'var(--gr-border-tech)';
      });
      const selected = document.getElementById(`child-${item.id}`);
      if (selected) {
        selected.style.background = 'var(--gr-lime)';
        selected.style.borderColor = 'var(--gr-void)';
      }
    }

    function resetBooming() {
      isBoomed = false;
      document.querySelectorAll('.booming-child-node').forEach(n => n.remove());
      const svg = document.getElementById('booming-svg');
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      document.getElementById('booming-count').innerText = '0';
      document.getElementById('specimen-code-label').innerHTML = 'SPECIMEN: <strong>GRM-1880-THAI-001</strong>';
      document.getElementById('node-title').innerText = 'ภูมิปัญญาอาหารเป็นยา (Food as Medicine)';
      document.getElementById('node-desc').innerText = 'การเชื่อมโยงภูมิปัญญาไทยโบราณข้ามสู่ผลวิจัยวิทยาศาสตร์ระดับโมเลกุลในปัจจุบัน ผู้ใช้สามารถคลิกโหนดลูกเพื่อระเบิดความรู้เจาะลึกต่อไปได้อีก 3 ชั้น';
      document.getElementById('node-takeaway').innerText = 'การทานต้มยำที่มีข่า ตะไคร้ ใบมะกรูด ช่วยกระตุ้นระบบภูมิคุ้มกันและต้านการอักเสบตามผลวิจัยสมัยใหม่';
    }

    // Initialize first slide on load
    updateSlide();