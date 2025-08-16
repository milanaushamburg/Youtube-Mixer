let playerA;
let playerB;
let useCreativeCommonsFilter = true;
let resultWindow = null;

let lastTapsA = [];
let lastTapsB = [];
const TAP_TIMEOUT = 2000;

let cuePointsA = [null, null, null];
let cuePointsB = [null, null, null];
let loopInA = null, loopOutA = null, isLoopingA = false;
let loopInB = null, loopOutB = null, isLoopingB = false;
let loopIntervalA, loopIntervalB;

const translations = {
    de: {
        'search-video-label': 'Video suchen:', 'search-button': 'Suchen', 'video-id-label': 'Video-ID:', 'load-button': 'Laden', 'tempo-label': 'Tempo-Anpassung:', 'beat-counter-label': 'Beat Counter:', 'sync-button': 'Sync', 'cue-points-label': 'Cue-Punkte:', 'loop-label': 'Loop:', 'loop-off-button': 'Loop Aus', 'loop-on-button': 'Loop An', 'filter-button': 'Filter: Ein', 'filter-hint': 'Filtert nach Creative Commons', 'audio-mix-label': 'Audio-Überblendung', 'player-a-label': 'Player A', 'player-b-label': 'Player B', 'latency-label': 'Latenz-Offset (ms):', 'show-result-label': 'Ergebnis anzeigen', 'bpm-default': 'BPM: --', 'loop-not-set': 'Loop-Punkte nicht gesetzt.', 'loop-out-before-in': 'Loop Out muss nach Loop In kommen.'
    },
    en: {
        'search-video-label': 'Search Video:', 'search-button': 'Search', 'video-id-label': 'Video ID:', 'load-button': 'Load', 'tempo-label': 'Tempo Adjustment:', 'beat-counter-label': 'Beat Counter:', 'sync-button': 'Sync', 'cue-points-label': 'Cue Points:', 'loop-label': 'Loop:', 'loop-off-button': 'Loop Off', 'loop-on-button': 'Loop On', 'filter-button': 'Filter: On', 'filter-hint': 'Filters by Creative Commons', 'audio-mix-label': 'Audio Crossfade', 'player-a-label': 'Player A', 'player-b-label': 'Player B', 'latency-label': 'Latency Offset (ms):', 'show-result-label': 'Show Result', 'bpm-default': 'BPM: --', 'loop-not-set': 'Loop points not set.', 'loop-out-before-in': 'Loop Out must be after Loop In.'
    },
    sr: {
        'search-video-label': 'Pretražite video:', 'search-button': 'Traži', 'video-id-label': 'ID video zapisa:', 'load-button': 'Učitaj', 'tempo-label': 'Podešavanje tempa:', 'beat-counter-label': 'Brojač takta:', 'sync-button': 'Sinhronizuj', 'cue-points-label': 'Cue tačke:', 'loop-label': 'Petlja:', 'loop-off-button': 'Petlja isključena', 'loop-on-button': 'Petlja uključena', 'filter-button': 'Filter: Uključen', 'filter-hint': 'Filtriraj po Creative Commons', 'audio-mix-label': 'Audio preklapanje', 'player-a-label': 'Player A', 'player-b-label': 'Player B', 'latency-label': 'Odmak kašnjenja (ms):', 'show-result-label': 'Prikaži rezultat', 'bpm-default': 'BPM: --', 'loop-not-set': 'Tačke petlje nisu postavljene.', 'loop-out-before-in': 'Tačka završetka mora biti posle početne tačke.'
    },
    hr: {
        'search-video-label': 'Pretražite video:', 'search-button': 'Traži', 'video-id-label': 'Video ID:', 'load-button': 'Učitaj', 'tempo-label': 'Prilagodba tempa:', 'beat-counter-label': 'Brojač ritma:', 'sync-button': 'Sinkroniziraj', 'cue-points-label': 'Cue točke:', 'loop-label': 'Petlja:', 'loop-off-button': 'Petlja isključena', 'loop-on-button': 'Petlja uključena', 'filter-button': 'Filter: Uključen', 'filter-hint': 'Filtriraj po Creative Commons', 'audio-mix-label': 'Audio preklapanje', 'player-a-label': 'Player A', 'player-b-label': 'Player B', 'latency-label': 'Pomak kašnjenja (ms):', 'show-result-label': 'Prikaži rezultat', 'bpm-default': 'BPM: --', 'loop-not-set': 'Točke petlje nisu postavljene.', 'loop-out-before-in': 'Završna točka mora biti poslije početne točke.'
    },
    fr: {
        'search-video-label': 'Rechercher une vidéo:', 'search-button': 'Rechercher', 'video-id-label': 'ID vidéo:', 'load-button': 'Charger', 'tempo-label': 'Ajustement du tempo:', 'beat-counter-label': 'Compteur de battements:', 'sync-button': 'Sync', 'cue-points-label': 'Points Cue:', 'loop-label': 'Boucle:', 'loop-off-button': 'Boucle Désactivée', 'loop-on-button': 'Boucle Activée', 'filter-button': 'Filtre: Activé', 'filter-hint': 'Filtre par Creative Commons', 'audio-mix-label': 'Fondu audio', 'player-a-label': 'Joueur A', 'player-b-label': 'Joueur B', 'latency-label': 'Décalage de latence (ms):', 'show-result-label': 'Afficher le résultat', 'bpm-default': 'BPM: --', 'loop-not-set': 'Points de boucle non définis.', 'loop-out-before-in': 'Le point de sortie doit être après le point d\'entrée.'
    },
    es: {
        'search-video-label': 'Buscar video:', 'search-button': 'Buscar', 'video-id-label': 'ID de video:', 'load-button': 'Cargar', 'tempo-label': 'Ajuste de tempo:', 'beat-counter-label': 'Contador de ritmo:', 'sync-button': 'Sincronizar', 'cue-points-label': 'Puntos de Cue:', 'loop-label': 'Bucle:', 'loop-off-button': 'Bucle Desactivado', 'loop-on-button': 'Bucle Activado', 'filter-button': 'Filtro: Activado', 'filter-hint': 'Filtra por Creative Commons', 'audio-mix-label': 'Fusión de audio', 'player-a-label': 'Reproductor A', 'player-b-label': 'Reproductor B', 'latency-label': 'Compensación de latencia (ms):', 'show-result-label': 'Mostrar resultado', 'bpm-default': 'BPM: --', 'loop-not-set': 'Puntos de bucle no definidos.', 'loop-out-before-in': 'El punto de salida debe estar después del punto de entrada.'
    },
    ru: {
        'search-video-label': 'Поиск видео:', 'search-button': 'Поиск', 'video-id-label': 'ID видео:', 'load-button': 'Загрузить', 'tempo-label': 'Настройка темпа:', 'beat-counter-label': 'Счетчик ритма:', 'sync-button': 'Синхр.', 'cue-points-label': 'Точки Cue:', 'loop-label': 'Петля:', 'loop-off-button': 'Петля Выкл', 'loop-on-button': 'Петля Вкл', 'filter-button': 'Фильтр: Вкл', 'filter-hint': 'Фильтрует по Creative Commons', 'audio-mix-label': 'Смешивание аудио', 'player-a-label': 'Плеер А', 'player-b-label': 'Плеер Б', 'latency-label': 'Смещение задержки (мс):', 'show-result-label': 'Показать результат', 'bpm-default': 'BPM: --', 'loop-not-set': 'Точки петли не установлены.', 'loop-out-before-in': 'Точка выхода должна быть после точки входа.'
    },
    zh: {
        'search-video-label': '搜索视频:', 'search-button': '搜索', 'video-id-label': '视频ID:', 'load-button': '加载', 'tempo-label': '速度调整:', 'beat-counter-label': '节拍计数器:', 'sync-button': '同步', 'cue-points-label': '提示点:', 'loop-label': '循环:', 'loop-off-button': '循环关闭', 'loop-on-button': '循环打开', 'filter-button': '筛选: 开启', 'filter-hint': '按知识共享许可筛选', 'audio-mix-label': '音频混合', 'player-a-label': '播放器A', 'player-b-label': '播放器B', 'latency-label': '延迟偏移(ms):', 'show-result-label': '显示结果', 'bpm-default': 'BPM: --', 'loop-not-set': '循环点未设置。', 'loop-out-before-in': '循环出点必须在入点之后。'
    },
    ja: {
        'search-video-label': '動画を検索:', 'search-button': '検索', 'video-id-label': '動画ID:', 'load-button': '読み込み', 'tempo-label': 'テンポ調整:', 'beat-counter-label': 'ビートカウンター:', 'sync-button': '同期', 'cue-points-label': 'キューポイント:', 'loop-label': 'ループ:', 'loop-off-button': 'ループオフ', 'loop-on-button': 'ループオン', 'filter-button': 'フィルタ: オン', 'filter-hint': 'クリエイティブ・コモンズでフィルタ', 'audio-mix-label': 'オーディオクロスフェード', 'player-a-label': 'プレーヤーA', 'player-b-label': 'プレーヤーB', 'latency-label': 'レイテンシーオフセット(ms):', 'show-result-label': '結果を表示', 'bpm-default': 'BPM: --', 'loop-not-set': 'ループポイントが設定されていません。', 'loop-out-before-in': 'ループアウトはループインの後である必要があります。'
    },
    ko: {
        'search-video-label': '비디오 검색:', 'search-button': '검색', 'video-id-label': '비디오 ID:', 'load-button': '불러오기', 'tempo-label': '템포 조정:', 'beat-counter-label': '비트 카운터:', 'sync-button': '동기화', 'cue-points-label': '큐 포인트:', 'loop-label': '루프:', 'loop-off-button': '루프 끄기', 'loop-on-button': '루프 켜기', 'filter-button': '필터: 켜기', 'filter-hint': '크리에이티브 커먼즈로 필터링', 'audio-mix-label': '오디오 크로스페이드', 'player-a-label': '플레이어 A', 'player-b-label': '플레이어 B', 'latency-label': '지연 시간 오프셋(ms):', 'show-result-label': '결과 표시', 'bpm-default': 'BPM: --', 'loop-not-set': '루프 포인트가 설정되지 않았습니다.', 'loop-out-before-in': '루프 아웃은 루프 인 이후여야 합니다.'
    }
};

const flagColors = {
    'de': ['#000000', '#FF0000', '#FFCC00'],
    'en': ['#0A1646', '#FFFFFF', '#C8102E'],
    'sr': ['#C6363B', '#11457E', '#FFFFFF'],
    'hr': ['#002360', '#FF0000', '#FFFFFF'],
    'fr': ['#002654', '#FFFFFF', '#ED2939'],
    'es': ['#AA151B', '#FFC400'],
    'ru': ['#FFFFFF', '#0033A0', '#D52B1E'],
    'zh': ['#E74441', '#FFFF00'],
    'ja': ['#BC002D', '#FFFFFF'],
    'ko': ['#C8102E', '#003478', '#FFFFFF']
};

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function() {
    playerA = new YT.Player('playerA', {
        height: '390',
        width: '640',
        videoId: document.getElementById('videoA').value,
        playerVars: { 'autoplay': 0, 'controls': 1 },
        events: { 'onReady': onPlayerReady }
    });

    playerB = new YT.Player('playerB', {
        height: '390',
        width: '640',
        videoId: document.getElementById('videoB').value,
        playerVars: { 'autoplay': 0, 'controls': 1 },
        events: { 'onReady': onPlayerReady }
    });

    const slider = document.getElementById('volumeSlider');
    slider.addEventListener('input', updateVolumes);

    setInterval(updateTimeDisplays, 1000);
    setLanguage('de');
}

function onPlayerReady(event) {
    console.log(`Player ${event.target.getIframe().id} ist bereit.`);
    if (event.target.getIframe().id === 'playerA') {
        startWaveform('A');
    } else {
        startWaveform('B');
    }
}

function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key] || el.textContent;
    });

    document.querySelectorAll('[title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (key && translations[lang][key]) {
            el.title = translations[lang][key];
        }
    });

    const filterBtn = document.getElementById('filterToggleBtn');
    filterBtn.textContent = translations[lang]['filter-button'];
    if (!useCreativeCommonsFilter) {
        filterBtn.textContent = filterBtn.textContent + (lang === 'de' ? ' Aus' : ' Off');
    }

    const loopBtnA = document.getElementById('loopBtnA');
    loopBtnA.textContent = isLoopingA ? translations[lang]['loop-on-button'] : translations[lang]['loop-off-button'];
    const loopBtnB = document.getElementById('loopBtnB');
    loopBtnB.textContent = isLoopingB ? translations[lang]['loop-on-button'] : translations[lang]['loop-off-button'];

    const colors = flagColors[lang];
    if (colors) {
        let gradient;
        if (colors.length === 2) {
            gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
        } else if (colors.length === 3) {
            gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
        }
        document.body.style.backgroundImage = gradient;
        document.body.style.backgroundSize = '100% 100%';
        document.body.style.animation = 'none';
    }
}

function syncTempo(player) {
    const otherPlayer = (player === 'A') ? playerB : playerA;
    const targetPlayer = (player === 'A') ? playerA : playerB;
    const bpmElement = (player === 'A') ? document.getElementById('bpmB') : document.getElementById('bpmA');

    const bpmText = bpmElement.textContent;
    const bpmMatch = bpmText.match(/BPM: (\d+)/);

    if (bpmMatch && targetPlayer.getDuration) {
        const otherBPM = parseFloat(bpmMatch[1]);
        const originalDuration = targetPlayer.getDuration();
        const originalBPM = 60 / originalDuration; 
        const newRate = otherBPM / (originalBPM * 10); 
        targetPlayer.setPlaybackRate(newRate);
        console.log(`Player ${player} synced to ${otherBPM} BPM.`);
        const tempoDisplay = document.getElementById('tempo' + player);
        const percentage = ((newRate - 1.0) * 100).toFixed(0);
        tempoDisplay.textContent = `${percentage}%`;
    } else {
        console.warn('Kann die BPM des anderen Players nicht synchronisieren. BPM-Wert nicht verfügbar.');
    }
}

function loadVideo(player) {
    const videoIdInput = document.getElementById('video' + player);
    const videoId = videoIdInput.value;
    if (!videoId) {
        console.error("Bitte geben Sie eine Video-ID ein.");
        return;
    }
    if (player === 'A') {
        playerA.loadVideoById(videoId);
    } else {
        playerB.loadVideoById(videoId);
    }
}

function toggleFilter() {
    useCreativeCommonsFilter = !useCreativeCommonsFilter;
    const btn = document.getElementById('filterToggleBtn');
    const lang = document.getElementById('languageSelect').value;
    btn.textContent = translations[lang]['filter-button'];
    if (!useCreativeCommonsFilter) {
        btn.textContent = btn.textContent + (lang === 'de' ? ' Aus' : ' Off');
    }
}

function searchYouTube(player) {
    const searchInput = document.getElementById('search' + player);
    const query = searchInput.value.trim();
    let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    if (query) {
        if (useCreativeCommonsFilter) {
            url += '&sp=EgIYAw%253D%253D';
        }
        window.open(url, '_blank');
    } else {
        console.warn("Bitte geben Sie einen Suchbegriff ein.");
    }
}

function updateVolumes() {
    const sliderValue = document.getElementById('volumeSlider').value;
    const volumeA = 100 - sliderValue;
    const volumeB = sliderValue;
    if (playerA && playerB) {
        playerA.setVolume(volumeA);
        playerB.setVolume(volumeB);
    }
}

function adjustSpeed(player, delta) {
    const targetPlayer = (player === 'A') ? playerA : playerB;
    const newSpeed = targetPlayer.getPlaybackRate() + delta;
    targetPlayer.setPlaybackRate(newSpeed);
    const tempoDisplay = document.getElementById('tempo' + player);
    const percentage = ((newSpeed - 1.0) * 100).toFixed(0);
    tempoDisplay.textContent = `${percentage}%`;
}

function tapBeat(player) {
    const now = Date.now();
    const taps = (player === 'A') ? lastTapsA : lastTapsB;
    const bpmDisplay = document.getElementById('bpm' + player);

    if (taps.length > 0 && now - taps[taps.length - 1] > TAP_TIMEOUT) {
        taps.length = 0;
    }

    taps.push(now);

    if (taps.length > 1) {
        const intervals = [];
        for (let i = 1; i < taps.length; i++) {
            intervals.push(taps[i] - taps[i-1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
        const bpm = Math.round(60000 / avgInterval);
        bpmDisplay.textContent = `BPM: ${bpm}`;
    } else {
        bpmDisplay.textContent = "BPM: --";
    }
}

function setCue(player, index) {
    const targetPlayer = (player === 'A') ? playerA : playerB;
    const cuePoints = (player === 'A') ? cuePointsA : cuePointsB;
    cuePoints[index] = targetPlayer.getCurrentTime();
    console.log(`Cue ${index + 1} für Player ${player} gesetzt bei ${formatTime(cuePoints[index])}`);
}

function goToCue(player, index) {
    const targetPlayer = (player === 'A') ? playerA : playerB;
    const cuePoints = (player === 'A') ? cuePointsA : cuePointsB;
    if (cuePoints[index] !== null) {
        targetPlayer.seekTo(cuePoints[index], true);
        targetPlayer.playVideo();
    } else {
        console.warn(`Cue ${index + 1} für Player ${player} ist nicht gesetzt.`);
    }
}

function setLoopIn(player) {
    const targetPlayer = (player === 'A') ? playerA : playerB;
    if (player === 'A') {
        loopInA = targetPlayer.getCurrentTime();
    } else {
        loopInB = targetPlayer.getCurrentTime();
    }
    console.log(`Loop In für Player ${player} gesetzt bei ${formatTime(targetPlayer.getCurrentTime())}`);
}

function setLoopOut(player) {
    const targetPlayer = (player === 'A') ? playerA : playerB;
    if (player === 'A') {
        loopOutA = targetPlayer.getCurrentTime();
    } else {
        loopOutB = targetPlayer.getCurrentTime();
    }
    console.log(`Loop Out für Player ${player} gesetzt bei ${formatTime(targetPlayer.getCurrentTime())}`);
}

function toggleLoop(player) {
    const targetPlayer = (player === 'A') ? playerA : playerB;
    const loopBtn = (player === 'A') ? document.getElementById('loopBtnA') : document.getElementById('loopBtnB');
    const lang = document.getElementById('languageSelect').value;

    if (player === 'A') {
        isLoopingA = !isLoopingA;
        if (isLoopingA) {
            if (loopInA === null || loopOutA === null) {
                console.warn(translations[lang]['loop-not-set']);
                isLoopingA = false;
                return;
            }
            if (loopOutA <= loopInA) {
                console.warn(translations[lang]['loop-out-before-in']);
                isLoopingA = false;
                return;
            }
            loopIntervalA = setInterval(() => {
                if (targetPlayer.getCurrentTime() >= loopOutA) {
                    targetPlayer.seekTo(loopInA, true);
                }
            }, 100);
            loopBtn.textContent = translations[lang]['loop-on-button'];
        } else {
            clearInterval(loopIntervalA);
            loopBtn.textContent = translations[lang]['loop-off-button'];
        }
    } else {
        isLoopingB = !isLoopingB;
        if (isLoopingB) {
            if (loopInB === null || loopOutB === null) {
                console.warn(translations[lang]['loop-not-set']);
                isLoopingB = false;
                return;
            }
            if (loopOutB <= loopInB) {
                console.warn(translations[lang]['loop-out-before-in']);
                isLoopingB = false;
                return;
            }
            loopIntervalB = setInterval(() => {
                if (targetPlayer.getCurrentTime() >= loopOutB) {
                    targetPlayer.seekTo(loopInB, true);
                }
            }, 100);
            loopBtn.textContent = translations[lang]['loop-on-button'];
        } else {
            clearInterval(loopIntervalB);
            loopBtn.textContent = translations[lang]['loop-off-button'];
        }
    }
}

function showResultScreen(source) {
    const sourcePlayer = (source === 'A') ? playerA : playerB;
    const videoId = sourcePlayer.getVideoData().video_id;
    const sliderValue = document.getElementById('volumeSlider').value;
    const currentTime = sourcePlayer.getCurrentTime();
    
    const latencyOffset = document.getElementById('latencyOffset').value;

    const resultUrl = `result.html?video=${videoId}&audio=${sliderValue}&source=${source}&start=${currentTime}&latency=${latencyOffset}`;
    
    if (resultWindow && !resultWindow.closed) {
        resultWindow.location.href = resultUrl;
    } else {
        resultWindow = window.open(resultUrl, '_blank', 'width=800,height=600');
    }
}

function startWaveform(player) {
    const waveformContainer = document.getElementById('waveform' + player);
    const bars = waveformContainer.querySelectorAll('.bar');

    setInterval(() => {
        bars.forEach(bar => {
            const height = Math.random() * 80 + 20;
            bar.style.height = `${height}%`;
        });
    }, 150);
}

function updateTimeDisplays() {
    if (playerA && playerA.getCurrentTime && playerA.getDuration) {
        const currentA = playerA.getCurrentTime();
        const durationA = playerA.getDuration();
        const remainingA = durationA - currentA;
        document.getElementById('currentTimeA').textContent = formatTime(currentA);
        document.getElementById('remainingTimeA').textContent = formatTime(remainingA);
    }
    if (playerB && playerB.getCurrentTime && playerB.getDuration) {
        const currentB = playerB.getCurrentTime();
        const durationB = playerB.getDuration();
        const remainingB = durationB - currentB;
        document.getElementById('currentTimeB').textContent = formatTime(currentB);
        document.getElementById('remainingTimeB').textContent = formatTime(remainingB);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = secs < 10 ? '0' + secs : secs;
    return `${formattedMinutes}:${formattedSeconds}`;
}

window.addEventListener('beforeunload', () => {
    if (resultWindow && !resultWindow.closed) {
        resultWindow.close();
    }
});