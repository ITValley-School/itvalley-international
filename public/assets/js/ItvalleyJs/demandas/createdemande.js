document.getElementById("btnSubmit").addEventListener("click", async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const data = {
        nome: document.getElementById("inp_nome").value,
        estimativa_horas: document.getElementById("inp_estimativa_horas").value || null,
        status: document.getElementById("inp_status").value,
        data_inicio: document.getElementById("inp_data_inicio").value || null,
        data_termino_prevista: document.getElementById("inp_data_termino_prevista").value || null,
        usuario_id: document.getElementById("inp_usuario_id").value || null,
        data_fim_realizado: document.getElementById("inp_data_fim_realizado").value || null
    };

    try {
        // Envia a requisição para o endpoint com os dados em JSON
        const response = await fetch("/api/demandas/createDemande", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            const result = await response.json();
            console.log("Salvo com sucesso:", result);
            alert("Demanda salva com sucesso!");
        } else {
            console.error("Erro ao salvar:", response.statusText);
            alert("Erro ao salvar a demanda. Verifique os dados e tente novamente.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao salvar a demanda. Tente novamente mais tarde.");
    }
});
