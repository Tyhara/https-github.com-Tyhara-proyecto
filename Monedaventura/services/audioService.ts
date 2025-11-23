
// Audio Service using Web Audio API for SFX (No assets needed) and HTML5 Audio for BGM

class AudioService {
  private musicEnabled: boolean = false;
  private sfxEnabled: boolean = true;
  private bgmAudio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;

  constructor() {
    // Load settings from localStorage if available
    const storedMusic = localStorage.getItem('musicEnabled');
    const storedSfx = localStorage.getItem('sfxEnabled');
    
    this.musicEnabled = storedMusic === 'true';
    this.sfxEnabled = storedSfx !== 'false'; // Default to true

    // Initialize BGM (Example: Peaceful playful loop)
    this.bgmAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=playful-cat-126668.mp3'); 
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = 0.2;

    if (this.musicEnabled) {
        // Browser policy blocks autoplay until interaction. 
        // We handle play() in user interaction events usually.
    }
  }

  private getContext() {
    if (!this.audioContext) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
      }
    }
    return this.audioContext;
  }

  toggleMusic(enable: boolean) {
    this.musicEnabled = enable;
    localStorage.setItem('musicEnabled', String(enable));
    
    if (this.bgmAudio) {
      if (enable) {
        this.bgmAudio.play().catch(e => console.log("Autoplay prevented:", e));
      } else {
        this.bgmAudio.pause();
      }
    }
  }

  toggleSfx(enable: boolean) {
    this.sfxEnabled = enable;
    localStorage.setItem('sfxEnabled', String(enable));
  }

  getSettings() {
    return { music: this.musicEnabled, sfx: this.sfxEnabled };
  }

  // Synthesized "Pop" sound for UI clicks
  playClick() {
    if (!this.sfxEnabled) return;

    const ctx = this.getContext();
    if (!ctx) return;

    // Resume context if suspended (browser policy)
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Pop sound envelope
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  // Synthesized "Success" chime
  playSuccess() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => { // C E G C
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0, now + i*0.1);
        gain.gain.linearRampToValueAtTime(0.1, now + i*0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i*0.1 + 0.3);
        
        osc.start(now + i*0.1);
        osc.stop(now + i*0.1 + 0.3);
    });
  }
  
  // Initialize Audio Context on first user interaction
  init() {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
          ctx.resume();
      }
      if (this.musicEnabled && this.bgmAudio && this.bgmAudio.paused) {
          this.bgmAudio.play().catch(() => {});
      }
  }
}

export const audioManager = new AudioService();
