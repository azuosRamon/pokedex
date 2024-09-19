
const campo_pesquisa = document.getElementById('poke_nome');
const pesquisar_btn = document.getElementById('pesquisar_btn');

pesquisar_btn.addEventListener("click", ()=>{load_pokemon(campo_pesquisa.value)})
back_btn.addEventListener("click", ()=>{
    if (campo_pesquisa.value > 1){
        campo_pesquisa.value--;
        load_pokemon(campo_pesquisa.value)
    }
})
after_btn.addEventListener("click", ()=>{
    campo_pesquisa.value++;
    load_pokemon(campo_pesquisa.value)
})

async function load_pokemon(id){
    url = (`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    const pokemon = await fetch(url)
    .then(response => response.json())
    .then((data) => {
        
        //console.log(data)
        let versoes = data.sprites.versions;
        const selecionar_geracao = document.getElementById('foto_geracao');
        const contentx = document.querySelectorAll('span.pokemon_caracteristicas');
        const content_status = document.querySelectorAll('span.pokemon_status');
        const li_tipo = document.getElementById('poketipo');
        li_tipo.innerHTML = '';
        let img = document.getElementById("foto_pokemon");
        img.style.minWidth = '200px';
        img.style.minHeight = '200px';
        url_sprite = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        if (!url_sprite){
            url_sprite = data.sprites.front_default;
        }
        img.src = url_sprite;

        
        function colocar_imagem_tipo(item){
            fetch(item.type.url)
            .then(response => response.json())
            .then((data2) => {
                /*console.log(data2);*/
                
                let fotos_tipo = data2.sprites['generation-viii']['sword-shield']['name_icon'];
                let img_tipo = document.createElement('img');
                img_tipo.classList.add('type');
                img_tipo.src = fotos_tipo;
                img_tipo.style.width = '100px';
                img_tipo.style.height = '22px';
                li_tipo.appendChild(img_tipo);
            })
            
        }
        let tipos_do_pokemos = data.types;
        tipos_do_pokemos.map(colocar_imagem_tipo);

        function pegar_cor(id_cor){
            url_cores = `https://pokeapi.co/api/v2/pokemon-color/${id_cor}`
            fetch(url_cores)
            .then(response => response.json())
            .then((data_cor) => {
                array_pokemon_da_cor = data_cor.pokemon_species
                array_pokemon_da_cor.map(pokemon_na_cor_correta)
                function pokemon_na_cor_correta(item){
                    if (item.name == data.name){
                        let cor_background = data_cor.name
                        img.style.background = `linear-gradient(180deg, ${cor_background}, rgba(0, 0, 0, .7))`
                    }
                    
                }
                
            })

        }
        cores = [1,2,3,4,5,6,7,8,9,10];
        cores.map(pegar_cor);

        

        let poke = [data.name.toUpperCase(),data.id, data.weight/10, data.height/10];
        
        poke.forEach((element, item) => {
            contentx[item].innerHTML = (` ${element}`);
        });
        
        let pokemon_status = [data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.stats[5].base_stat]
        
        pokemon_status.forEach( (element, item) => {
            content_status[item].innerHTML = (` ${element}`);
        })

        const habilidades = data.abilities;
        const campo_habilidades = document.getElementById("habilidade_li");
        campo_habilidades.innerHTML = '';

        function escrever_habilidades(item){
            let p_habilidade = document.createElement('p');
            p_habilidade.classList.add('pokeinfo');
            p_habilidade.textContent = item.ability.name;
            campo_habilidades.appendChild(p_habilidade);
        }

        habilidades.map(escrever_habilidades);
        //console.log(versoes)

    })
    .catch(error => alert("Pokemon não encontrado!"))
}
load_pokemon(campo_pesquisa.value);

document.addEventListener('keydown', (event)=>{
            let key = event.key;
            if (key === "ArrowRight"){
                campo_pesquisa.value++;
                load_pokemon(campo_pesquisa.value)
            }
            if (key === "ArrowLeft"){
                campo_pesquisa.value--;
                load_pokemon(campo_pesquisa.value)
            }
            if (key === "Enter"){
                load_pokemon(campo_pesquisa.value)
            }
})