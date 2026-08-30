// --- Logo Gear Spin Easter Egg ---

export function initEasterEggs() {
  // Toast Notification Helper
  function showEasterEggToast(icon, title, message) {
    const existing = document.querySelector('.easter-egg-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'easter-egg-toast';
    toast.innerHTML = `
      <div style="font-size: 24px; margin-right: 12px;">${icon}</div>
      <div>
        <div style="font-weight: 700; font-size: 14px; color: #F7B500; text-transform: uppercase; letter-spacing: 0.5px;">${title}</div>
        <div style="font-size: 13px; color: #E6E1D6; margin-top: 2px;">${message}</div>
      </div>
    `;

    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: '#1E2228',
      border: '1px solid #F7B500',
      borderRadius: '12px',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      zIndex: '99999',
      fontFamily: 'system-ui, sans-serif',
      transform: 'translateY(100px)',
      opacity: '0',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Logo Gear Spin Easter Egg
  const logoHeader = document.querySelector('.logo-gear');
  if (logoHeader) {
    let rotation = 0;
    logoHeader.parentElement.style.cursor = 'pointer';
    logoHeader.parentElement.addEventListener('click', () => {
      rotation += 360;
      logoHeader.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      logoHeader.style.transform = `rotate(${rotation}deg)`;
      showEasterEggToast('⚙️', 'ENGINE REVVED', 'Heavy Diesel Engine V12 is roaring at 2,400 RPM!');
    });
  }
}
