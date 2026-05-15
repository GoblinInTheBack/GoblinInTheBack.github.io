<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAGI_INTERFACE_SYSTEM_7.5</title>
    <style>
        /* --- NERV/MAC 1-BIT PALETTE --- */
        :root {
            --white: #ffffff;
            --off-white: #f0f0f0;
            --black: #000000;
            --dither-pattern: radial-gradient(#000 0.5px, transparent 0.5px);
        }

        * { box-sizing: border-box; cursor: crosshair; }

        body {
            margin: 0;
            background-color: var(--off-white);
            background-image: var(--dither-pattern);
            background-size: 4px 4px;
            font-family: 'Courier New', Courier, monospace;
            color: var(--black);
            height: 100vh;
            overflow: hidden;
            text-transform: uppercase;
        }

        /* --- DESKTOP WRAPPER FOR SCALE --- */
        .desktop-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            height: 100%;
            width: 100%;
        }

        /* --- APPLE SYSTEM BAR --- */
        .system-bar {
            height: 24px;
            background: var(--off-white);
            border-bottom: 2px solid var(--black);
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-size: 11px;
            font-weight: 900;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            gap: 25px;
        }

        .system-bar span { cursor: pointer; }
        .system-bar .time { margin-left: auto; }

        .system-bar span:hover {
            text-decoration: underline;
        }

        /* --- STATUS TICKER --- */
        .status-ticker {
            margin-left: auto;
            margin-right: 15px;
            font-size: 10px;
            font-weight: bold;
            animation: blink 0.7s infinite;
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
        }

        /* --- THE DESKTOP --- */
        .desktop {
            padding-top: 40px;
            height: calc(100% - 40px);
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 15px;
            padding: 20px;
            padding-bottom: 80px;
            overflow: hidden;
        }

        /* --- CLASSIC MAC WINDOWS --- */
        .window {
            background: var(--off-white);
            border: 2px solid var(--black);
            box-shadow: 4px 4px 0px var(--black);
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 100;
        }

        .window:nth-child(1) {
            z-index: 102;
        }

        .window:nth-child(2) {
            z-index: 101;
            margin-top: -20px;
            margin-left: 20px;
        }

        .title-bar {
            height: 22px;
            background: repeating-linear-gradient(0deg, var(--white), var(--white) 2px, var(--black) 2px, var(--black) 4px);
            border-bottom: 2px solid var(--black);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            user-select: none;
        }

        .title-text {
            background: var(--off-white);
            padding: 0 12px;
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .close-square {
            position: absolute;
            left: 6px;
            width: 12px;
            height: 12px;
            border: 1.5px solid var(--black);
            background: var(--off-white);
        }

        .close-square:hover {
            background: var(--black);
        }

        /* --- CONTENT AREAS --- */
        .content {
            padding: 12px;
            overflow-y: auto;
            flex: 1;
            background-image: var(--dither-pattern);
            background-size: 4px 4px;
        }

        /* --- GRAPH PAPER OVERLAY --- */
        .content.graph-paper {
            background-image: 
                linear-gradient(0deg, transparent 24px, rgba(0,0,0,.05) 25px),
                linear-gradient(90deg, transparent 24px, rgba(0,0,0,.05) 25px),
                var(--dither-pattern);
            background-size: 25px 25px, 25px 25px, 4px 4px;
        }

        .portfolio-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .project-card {
            border: 1px solid var(--black);
            padding: 10px;
            background: var(--white);
        }

        .pixel-thumb {
            width: 100%;
            height: 80px;
            background-image: 
                repeating-linear-gradient(0deg, var(--black) 0px, var(--black) 1px, transparent 1px, transparent 3px),
                repeating-linear-gradient(90deg, var(--black) 0px, var(--black) 1px, transparent 1px, transparent 3px);
            background-size: 3px 3px;
            border: 1px solid var(--black);
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            background-color: #e0e0e0;
            font-size: 9px;
        }

        .project-card strong {
            font-size: 9px;
            display: block;
            margin-bottom: 4px;
        }

        .project-card p {
            font-size: 8px;
            margin: 4px 0;
            line-height: 1.3;
        }

        .open-button {
            border: 1px solid var(--black);
            text-align: center;
            font-size: 8px;
            padding: 3px 2px;
            margin-top: 6px;
            cursor: pointer;
            font-weight: bold;
            background: var(--off-white);
            text-decoration: none;
            color: var(--black);
            display: block;
            transition: all 0.1s;
        }

        .open-button:active {
            transform: translate(1px, 1px);
            box-shadow: inset 1px 1px 0px var(--black);
        }

        /* --- NARRATIVE LOG --- */
        .narrative-section {
            margin-top: 12px;
            border-top: 1px dashed var(--black);
            padding-top: 8px;
            font-size: 8px;
            line-height: 1.4;
        }

        .narrative-header {
            font-weight: 900;
            margin-bottom: 4px;
        }

        /* --- MAGI STATS PANEL --- */
        .magi-panel {
            display: flex;
            flex-direction: column;
            gap: 15px;
            overflow-y: auto;
        }

        .stat-box {
            border: 1px solid var(--black);
            padding: 6px;
            font-size: 8px;
            background: var(--white);
        }

        .stat-label {
            font-weight: bold;
            margin-bottom: 4px;
        }

        .stat-bar {
            height: 6px;
            border: 1px solid var(--black);
            background: var(--off-white);
            overflow: hidden;
        }

        .stat-fill {
            height: 100%;
            background: var(--black);
        }

        .magi-vote {
            display: flex;
            justify-content: space-between;
            gap: 3px;
            margin-top: 4px;
        }

        .vote-light {
            flex: 1;
            height: 18px;
            border: 1px solid var(--black);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 7px;
            font-weight: bold;
        }

        .active-vote {
            background: var(--black);
            color: var(--white);
        }

        /* --- SIGNAL WAVE WINDOW --- */
        .wave-display {
            height: 140px;
            background-image: 
                linear-gradient(var(--black) 1px, transparent 1px),
                linear-gradient(90deg, var(--black) 1px, transparent 1px);
            background-size: 8px 8px;
            opacity: 0.25;
            position: relative;
            overflow: hidden;
        }

        .wave-line {
            position: absolute;
            width: 100%;
            height: 1px;
            background: var(--black);
            top: 70px;
            animation: wave 3s infinite linear;
        }

        @keyframes wave {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        /* --- BOTTOM DOCK --- */
        .dock {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 60px;
            background: var(--off-white);
            border-top: 2px solid var(--black);
            display: flex;
            align-items: center;
            padding: 0 20px;
            gap: 12px;
            z-index: 999;
            box-shadow: 0 -4px 0px var(--black);
        }

        .dock-icon {
            width: 40px;
            height: 40px;
            border: 1px solid var(--black);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 7px;
            background: var(--white);
            cursor: pointer;
            transition: all 0.1s;
        }

        .dock-icon:active {
            transform: translate(1px, 1px);
            box-shadow: inset 1px 1px 0px var(--black);
        }

        .dock-button {
            margin-left: auto;
            border: 1px solid var(--black);
            padding: 5px 12px;
            font-weight: 900;
            font-size: 9px;
            background: var(--off-white);
            cursor: pointer;
            text-decoration: none;
            color: var(--black);
            display: inline-block;
            transition: all 0.1s;
        }

        .dock-button:active {
            transform: translate(2px, 2px);
            box-shadow: inset 2px 2px 0px var(--black);
        }

        /* --- SCROLLBARS --- */
        ::-webkit-scrollbar {
            width: 14px;
        }

        ::-webkit-scrollbar-track {
            background-image: var(--dither-pattern);
            background-size: 4px 4px;
        }

        ::-webkit-scrollbar-thumb {
            background: var(--off-white);
            border: 2px solid var(--black);
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 900px) {
            .desktop {
                grid-template-columns: 1fr;
            }

            .magi-panel {
                grid-column: 1;
            }

            .portfolio-grid {
                grid-template-columns: 1fr;
            }
        }

    </style>
</head>
<body>

    <div class="desktop-wrapper">
        <div class="system-bar">
            <span style="cursor: default;">⌘ NERV</span>
            <span>FILE</span>
            <span>EDIT</span>
            <span>MAGI_SYNC</span>
            <span>SPECIAL</span>
            <span class="status-ticker">◐ SYNCING...</span>
            <span class="time" id="clock">14:03</span>
        </div>

        <div class="desktop">
            
            <div class="window">
                <div class="title-bar">
                    <div class="close-square"></div>
                    <div class="title-text">PORTFOLIO_ARCHIVE_EV-01</div>
                </div>
                <div class="content">
                    <div class="portfolio-grid">
                        <div class="project-card">
                            <div class="pixel-thumb">HOME</div>
                            <strong>WELCOME</strong>
                            <p>Entry point to the portfolio system.</p>
                            <a href="/" class="open-button">OPEN</a>
                        </div>
                        <div class="project-card">
                            <div class="pixel-thumb">ABOUT</div>
                            <strong>PROFILE</strong>
                            <p>Background & system specs.</p>
                            <a href="/about.html" class="open-button">OPEN</a>
                        </div>
                        <div class="project-card">
                            <div class="pixel-thumb">WORK</div>
                            <strong>PROJECTS</strong>
                            <p>Creative work archive.</p>
                            <a href="/projects.html" class="open-button">OPEN</a>
                        </div>
                        <div class="project-card">
                            <div class="pixel-thumb">LINK</div>
                            <strong>CONTACT</strong>
                            <p>Communication protocols.</p>
                            <a href="/contact.html" class="open-button">OPEN</a>
                        </div>
                    </div>

                    <div class="narrative-section">
                        <div class="narrative-header">◆ LOG:</div>
                        <p>MAGI operational. All subsystems synchronized. Neural integration ready. Proceed with archive access...</p>
                    </div>
                </div>
            </div>

            <div class="magi-panel">
                <div class="window">
                    <div class="title-bar">
                        <div class="close-square"></div>
                        <div class="title-text">MAGI_STATUS</div>
                    </div>
                    <div class="content" style="padding: 8px;">
                        <div class="stat-box">
                            <div class="stat-label">SYNC:</div>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: 100%;"></div>
                            </div>
                            <div style="text-align: center; margin-top: 2px; font-size: 7px;">100%</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-label">HARMONICS:</div>
                            <div style="text-align: center; font-size: 8px;">✓ OPTIMAL</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-label">LINK:</div>
                            <div style="text-align: center; font-size: 8px;">● ACTIVE</div>
                        </div>
                        <div style="margin-top: 4px;">
                            <div class="stat-label" style="margin-bottom: 6px;">VOTE:</div>
                            <div class="magi-vote">
                                <div class="vote-light active-vote">MEL</div>
                                <div class="vote-light active-vote">BAL</div>
                                <div class="vote-light active-vote">CAS</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="window">
                    <div class="title-bar">
                        <div class="close-square"></div>
                        <div class="title-text">SIGNAL_WAVE</div>
                    </div>
                    <div class="wave-display">
                        <div class="wave-line" style="animation-delay: 0s;"></div>
                        <div class="wave-line" style="top: 60px; animation-delay: 0.5s;"></div>
                        <div class="wave-line" style="top: 80px; animation-delay: 1s;"></div>
                    </div>
                </div>

                <div class="window">
                    <div class="title-bar">
                        <div class="close-square"></div>
                        <div class="title-text">ARCHIVE</div>
                    </div>
                    <div class="content" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                        <div style="font-size: 32px; font-weight: 900;">04</div>
                        <div style="font-size: 8px; margin-top: 8px;">FILES ACTIVE</div>
                    </div>
                </div>
            </div>

        </div>

        <div class="dock">
            <div class="dock-icon">
                <div style="width: 12px; height: 12px; border: 1px solid black;"></div>
                <span style="font-size: 6px; margin-top: 2px;">SYS</span>
            </div>
            <div class="dock-icon">
                <div style="width: 12px; height: 12px; border: 1px solid black; background: black;"></div>
                <span style="font-size: 6px; margin-top: 2px;">DISK</span>
            </div>
            <div class="dock-icon">
                <span>(?) </span>
                <span style="font-size: 6px;">INFO</span>
            </div>
            <a href="https://github.com/GoblinInTheBack/GoblinInTheBack.github.io" target="_blank" class="dock-button">GITHUB →</a>
            <a href="/updates.html" class="dock-button">UPDATES →</a>
        </div>
    </div>

    <script>
        // Update clock
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('clock').textContent = hours + ':' + minutes;
        }
        updateClock();
        setInterval(updateClock, 1000);

        // Add window drag functionality
        let dragging = null;
        document.querySelectorAll('.title-bar').forEach(bar => {
            bar.addEventListener('mousedown', (e) => {
                dragging = bar.closest('.window');
                dragging.style.position = 'absolute';
            });
        });

        document.addEventListener('mousemove', (e) => {
            if (dragging && false) { // Disabled for now to preserve layout
                dragging.style.left = e.clientX + 'px';
                dragging.style.top = e.clientY + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            dragging = null;
        });
    </script>

</body>
</html>
