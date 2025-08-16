// 全局音频管理器，用于确保同一时间只有一个音频在播放
class AudioManager {
  private static instance: AudioManager;
  private currentPlayer: any = null;
  private currentAudioUrl: string = '';

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  setCurrentPlayer(player: any, audioUrl: string) {
    // 如果有其他播放器在播放，先停止它
    if (this.currentPlayer && this.currentPlayer !== player) {
      try {
        if (this.currentPlayer.isPlaying && this.currentPlayer.isPlaying()) {
          this.currentPlayer.pause();
        }
      } catch (error) {
        console.warn('Failed to pause previous player:', error);
      }
    }
    this.currentPlayer = player;
    this.currentAudioUrl = audioUrl;
  }

  stopCurrentPlayer() {
    if (this.currentPlayer) {
      try {
        if (this.currentPlayer.isPlaying && this.currentPlayer.isPlaying()) {
          this.currentPlayer.pause();
        }
      } catch (error) {
        console.warn('Failed to stop current player:', error);
      } finally {
        this.currentPlayer = null;
        this.currentAudioUrl = '';
      }
    }
  }

  getCurrentAudioUrl(): string {
    return this.currentAudioUrl;
  }

  isCurrentPlayer(player: any): boolean {
    return this.currentPlayer === player;
  }
}

export default AudioManager;
