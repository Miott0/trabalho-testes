import React from 'react';
import Header from './Header'; // Certifique-se de que o caminho está correto
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageUrls = [
    'https://img.freepik.com/fotos-gratis/renderizacao-3d-do-modelo-de-casa_23-2150799681.jpg?semt=ais_hybrid',
    'https://www.ugreen.com.br/wp-content/uploads/2019/07/casa-sustentavel.jpg',
    'https://s2.glbimg.com/Vvq-X0eJRT0_favHrTHTfndIzK4j8N0uD-FuSIdSoFJIoz-HdGixxa_8qOZvMp3w/e.glbimg.com/og/ed/f/original/2012/12/20/top_10_2012_praia_03.jpg',
        'https://images.homify.com/v1488473405/p/photo/image/1881231/AP.FACHADAFINAL.jpg',
  ];

  return (
    <div>
      <Header />
      <main className="bg-gray-100">
        {/* Carrossel de Imagens */}
        <div className="container mx-auto py-8">
          <Slider {...settings}>
            {imageUrls.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`Slide ${index + 1}`} className="w-full h-96 object-cover rounded-lg shadow-md" />
              </div>
            ))}
          </Slider>
        </div>

        {/* Botões de Navegação */}
        <div className="container mx-auto py-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <Link to="/users">
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors">
              Usuários
            </button>
          </Link>
          <Link to="/properties">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors">
              Propriedades
            </button>
          </Link>
          <Link to="/appointments">
            <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors">
              Agendamentos
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
