function playAudio() {
    alert('Função playAudio foi chamada');
    console.log('Função playAudio foi chamada');
    if (sc_audio && sc_audio.data && sc_audio.data.api && sc_audio.data.api.data) {
        console.log('Dados de áudio encontrados:', sc_audio.data.api.data);
        var audioBlob = new Blob([sc_audio.data.api.data], { type: 'audio/mpeg' });
        var audioUrl = URL.createObjectURL(audioBlob);
        console.log('URL de áudio criada:', audioUrl);
        document.getElementById('audioElement').src = audioUrl;
        document.getElementById('audioElement').play();
    } else {
        console.error("Os dados de áudio não estão disponíveis ou estão em um formato inesperado.");
    }
}

document.getElementById('formAudio').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário enviado, chamando playAudio');
    playAudio();
});