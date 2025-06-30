document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const header = document.querySelector('.header');

    // Função para adicionar/remover a classe 'active' nas seções e links de navegação
    const activateSection = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight; // Ajusta a altura do cabeçalho
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.id;
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });

        // Adiciona classe 'visible' ao header após o carregamento inicial e scroll
        if (window.scrollY > 50 || currentSectionId === 'home') { // Mostra o header se houver scroll ou na home
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }

        // Animar os dots da primeira página
        const homeSection = document.getElementById('home');
        if (homeSection && homeSection.classList.contains('active')) {
            const dots = document.querySelectorAll('.portfolio-dots .dot');
            dots.forEach((dot, index) => {
                // Simples animação sequencial
                setTimeout(() => {
                    dot.classList.add('active');
                }, index * 200); // Atraso para cada dot
            });
        } else {
            // Remove active dos dots quando sai da seção home
            document.querySelectorAll('.portfolio-dots .dot').forEach(dot => dot.classList.remove('active'));
        }
    };

    // Event listener para scroll
    window.addEventListener('scroll', activateSection);
    // Chama a função uma vez ao carregar para definir a seção inicial
    activateSection();

    // Smooth scroll para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Função para carregar vídeos no placeholder (quando clicado)
    document.querySelectorAll('.video-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const videoDescription = this.querySelector('p').textContent;
            let videoId = '';
            // Lógica para determinar o ID do vídeo com base na descrição
            if (videoDescription.includes('Altinha')) {
                videoId = 'COLOQUE_AQUI_O_ID_DO_VIDEO_DA_ALTINHA'; // Substitua pelo ID real do vídeo do YouTube/Vimeo
            } else if (videoDescription.includes('JAGUAR E-PACE')) {
                videoId = 'COLOQUE_AQUI_O_ID_DO_VIDEO_DO_JAGUAR'; // Substitua pelo ID real do vídeo do YouTube/Vimeo
            }

            if (videoId) {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`); // Adiciona autoplay e remove vídeos relacionados
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                this.innerHTML = ''; // Limpa o conteúdo do placeholder
                this.appendChild(iframe); // Adiciona o iframe
                this.classList.add('video-loaded'); // Opcional: para estilizar quando o vídeo estiver carregado
            } else {
                console.warn('ID do vídeo não encontrado para a descrição:', videoDescription);
            }
        });
    });

    // Animação inicial para a primeira seção
    const firstSection = document.querySelector('.hero-section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
});

// Para garantir que as animações iniciem corretamente no primeiro load
window.addEventListener('load', () => {
    document.querySelector('.header').classList.add('visible');
    // Força um scroll para ativar as animações da primeira seção se o usuário estiver no topo
    if (window.scrollY === 0) {
        window.dispatchEvent(new Event('scroll'));
    }
});