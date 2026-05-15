function updateMagiProgress() {
    // 1. Set your project timeline dates (YYYY-MM-DD)
    const startDate = new Date('2025-10-01').getTime();
    const endDate = new Date('2028-12-30').getTime();
    const now = new Date().getTime();

    // 2. Calculate totals and progress
    const totalDuration = endDate - startDate;
    const timeElapsed = now - startDate;

    // 3. Convert to percentage and clamp between 0 and 100
    let percentage = (timeElapsed / totalDuration) * 100;
    percentage = Math.max(0, Math.min(100, percentage)); 

    // 4. Format to 1 decimal place (e.g., 87.4%)
    const formattedPercent = percentage.toFixed(1) + '%';

    // 5. Inject values into the MAGI interface
    document.getElementById('sync-text').innerText = formattedPercent;
    document.getElementById('sync-bar').style.width = formattedPercent;
}

function shakeWindows() {
    document.querySelectorAll('.window').forEach((win) => {
        if (Math.random() > 0.45) return;
        win.classList.add('shake');
        win.addEventListener('animationend', () => {
            win.classList.remove('shake');
        }, { once: true });
    });
}

window.addEventListener('load', () => {
    updateMagiProgress();
    shakeWindows();
    setInterval(shakeWindows, 4200);
});