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
            --black: #000000;
            --dither-lite: radial-gradient(var(--black) 0.5px, transparent 0.5px);
            --dither-heavy: repeating-conic-gradient(var(--black) 0% 25%, var(--white) 0% 50%) 
                            50% / 2px 2px;
        }

        * { box-sizing: border-box; cursor: crosshair; }

        body {
            margin: 0;
            background-color: var(--white);
            background-image: var(--dither-lite);
            background-size: 3px 3px;
            font-family: 'Courier New', Courier, monospace;
            color: var(--black);
            height: 100vh;
            overflow: hidden;
            text-transform: uppercase;
        }

        /* --- APPLE SYSTEM BAR --- */
        .system-bar {
            height: 24px;
            background: var(--white);
            border-bottom: 2px solid var(--black);
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-size: 13px;
            font-weight: 900;
            position: fixed;
            top: 0; width: 100%; z-index: 1000;
        }

        .system-bar span { margin-right: 15px; }
        .system-bar .time { margin-left: auto; }

        /* --- THE DESKTOP --- */
        .desktop {
            padding-top: 40px;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 20px;
            padding: 40px 20px 80px 20px;
            overflow-y: auto;
        }

        /* --- CLASSIC MAC WINDOWS --- */
        .window {
            background: var(--white);
            border: 2px solid var(--black);
            box-shadow: 6px 6px 0px var(--black);
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
        }

        .title-bar {
            height: 22px;
            background: repeating-linear-gradient(0deg, var(--white), var(--white) 2px, var(--black) 2px, var(--black) 4px);
            border-bottom: 2px solid var(--black);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .title-text {
            background: var(--white);
            padding: 0 12px;
            font-size: 11px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .close-square {
            position: absolute; left: 6px;
            width: 12px; height: 12px;
            border: 1px solid var(--black);
            background: var(--white);
        }

        /* --- CONTENT AREAS --- */
        .content { padding: 15px; overflow-y: auto; max-height: 400px; }

        .portfolio-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .project-card {
            border: 1px solid var(--black);
            padding: 10px;
        }

        .pixel-thumb {
            width: 100%;
            height: 100px;
            background-image: var(--dither-heavy);
            border: 1px solid var(--black);
            margin-bottom: 8px;
            display: flex;
            align-items: center; justify-content: center;
            font-weight: bold;
            background-color: #eee;
            font-size: 10px;
        }

        .project-card strong {
            font-size: 10px;
            display: block;
            margin-bottom: 5px;
        }

        .project-card p {
            font-size: 9px;
            margin: 5px 0;
            line-height: 1.3;
        }

        .open-button {
            border: 1px solid black;
            text-align: center;
            font-size: 9px;
            padding: 3px 2px;
            margin-top: 8px;
            cursor: pointer;
            font-weight: bold;
            background: var(--white);
            text-decoration: none;
            color: var(--black);
            display: block;
        }

        .open-button:active {
            transform: translate(1px, 1px);
            box-shadow: inset 1px 1px 0px var(--black);
        }

        /* --- MAGI STATS PANEL --- */
        .magi-panel {
            border-left: 2px dashed var(--black);
            padding-left: 15px;
            font-size: 10px;
        }

        .stat-box {
            border: 1px solid var(--black);
            margin-bottom: 10px;
            padding: 5px;
            font-size: 9px;
        }

        .magi-vote {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
        }

        .vote-light {
            width: 30%; height: 20px; border: 1px solid var(--black);
            display: flex; align-items: center; justify-content: center;
            font-size: 8px;
        }

        .active-vote { background: var(--black); color: var(--white); }

        /* --- BOTTOM DOCK --- */
        .dock {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 60px;
            background: var(--white);
            border-top: 2px solid var(--black);
            display: flex;
            align-items: center;
            padding: 0 20px;
            gap: 20px;
            z-index: 999;
        }

        .dock-icon {
            width: 40px; height: 40px;
            border: 1px solid var(--black);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            font-size: 8px;
        }

        .dock-button {
            margin-left: auto;
            border: 1px solid var(--black);
            padding: 5px 15px;
            font-weight: 900;
            font-size: 10px;
            background: var(--white);
            cursor: pointer;
            text-decoration: none;
            color: var(--black);
            display: inline-block;
        }

        .dock-button:active {
            transform: translate(2px, 2px);
            box-shadow: inset 2px 2px 0px var(--black);
        }

        /* --- SCROLLBARS --- */
        ::-webkit-scrollbar { width: 14px; }
        ::-webkit-scrollbar-track { background-image: var(--dither-heavy); }
        ::-webkit-scrollbar-thumb { background: var(--white); border: 2px solid var(--black); }

        /* --- NARRATIVE LOG --- */
        .narrative-section {
            margin-top: 20px;
            border-top: 2px solid black;
            padding-top: 10px;
        }

        .narrative-header {
            font-weight: 900;
            font-size: 10px;
            margin-bottom: 5px;
        }

        .narrative-text {
            font-size: 9px;
            line-height: 1.4;
        }

    </style>
</head>
<body>

    <div class="system-bar">
        <span></span>
        <span>FILE</span>
        <span>EDIT</span>
        <span>MAGI_SYNC</span>
        <span>NEURAL_LINK</span>
        <span class="time" id="clock">14:03 PM</span>
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
                        <strong>WELCOME_PAGE</strong>
                        <p>Entry point to the portfolio system with navigation overview.</p>
                        <a href="/" class="open-button">OPEN_FILE</a>
                    </div>
                    <div class="project-card">
                        <div class="pixel-thumb">ABOUT</div>
                        <strong>PROFILE_DATA</strong>
                        <p>Personal background, skills, and system specifications.</p>
                        <a href="/about.html" class="open-button">OPEN_FILE</a>
                    </div>
                    <div class="project-card">
                        <div class="pixel-thumb">PROJECTS</div>
                        <strong>WORK_ARCHIVE</strong>
                        <p>Showcase of completed projects and creative works.</p>
                        <a href="/projects.html" class="open-button">OPEN_FILE</a>
                    </div>
                    <div class="project-card">
                        <div class="pixel-thumb">CONTACT</div>
                        <strong>LINK_PROTOCOL</strong>
                        <p>Methods for establishing communication channels.</p>
                        <a href="/contact.html" class="open-button">OPEN_FILE</a>
                    </div>
                </div>

                <div class="narrative-section">
                    <div class="narrative-header">NARRATIVE_LOG:</div>
                    <p class="narrative-text">The MAGI system is operational. All portfolio subsystems are synchronized and ready for neural integration. Welcome to GoblinInTheBack's creative archive. Proceed with file access protocols...</p>
                </div>
            </div>
        </div>

        <div class="magi-panel">
            <div class="window">
                <div class="title-bar"><div class="title-text">MAGI_STATUS</div></div>
                <div class="content">
                    <div class="stat-box">
                        PORTFOLIO_SYNC: 100%
                        <div style="height: 6px; border: 1px solid black; margin-top: 4px;">
                            <div style="width: 100%; height: 100%; background: black;"></div>
                        </div>
                    </div>
                    <div class="stat-box">
                        HARMONICS: OPTIMAL
                    </div>
                    <div class="stat-box">
                        LINK_STATUS: ACTIVE
                    </div>
                    <div class="magi-vote">
                        <div class="vote-light active-vote">MEL</div>
                        <div class="vote-light active-vote">BAL</div>
                        <div class="vote-light active-vote">CAS</div>
                    </div>
                </div>
            </div>

            <div class="window" style="height: 150px;">
                <div class="title-bar"><div class="title-text">SIGNAL_WAVE</div></div>
                <div style="height: 100%; background-image: linear-gradient(var(--black) 1px, transparent 1px), linear-gradient(90deg, var(--black) 1px, transparent 1px); background-size: 10px 10px; opacity: 0.3;"></div>
            </div>

            <div class="window">
                <div class="title-bar"><div class="title-text">ARCHIVE_COUNT</div></div>
                <div class="content" style="max-height: 100px;">
                    <div style="font-size: 28px; font-weight: 900; text-align: center; padding: 10px;">
                        04
                    </div>
                    <div style="font-size: 9px; text-align: center;">
                        PAGES ACTIVE
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="dock">
        <div class="dock-icon"><div style="width: 15px; height: 15px; border: 1px solid black;"></div>SYS</div>
        <div class="dock-icon"><div style="width: 15px; height: 15px; border: 1px solid black; background: black;"></div>DISK</div>
        <div class="dock-icon"><span>( ? )</span>INFO</div>
        <a href="https://github.com/GoblinInTheBack/GoblinInTheBack.github.io" target="_blank" class="dock-button">
            GITHUB →
        </a>
        <a href="/updates.html" class="dock-button">
            UPDATES →
        </a>
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
    </script>

</body>
</html>
