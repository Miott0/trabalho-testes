import React from 'react';
import Header from './Header'; // Certifique-se de que o caminho está correto
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const properties = [
        {
            image:
                'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzYSUyMGRlJTIwbHV4b3xlbnwwfHwwfHx8MA%3D%3D',
            title: 'Casa Moderna',
            area: '600 m²',
            location: 'São Paulo, SP',
            price: 'R$ 1.500.000',
        },
        {
            image: 'https://gelkerribeiro.com.br/wp-content/uploads/2024/06/Projeto-Casa-fachada-moderna-conceito-19.webp',
            title: 'Casa Sustentável',
            area: '300 m²',
            location: 'Curitiba, PR',
            price: 'R$ 1.800.000',
        },
        {
            image:
                'https://wallpapers.com/images/hd/beach-house-huvahendhoo-island-6w59ngewll231qc7.jpg',
            title: 'Casa de Praia',
            area: '200 m²',
            location: 'Florianópolis, SC',
            price: 'R$ 2.200.000',
        },
        {
            image: 'https://gelkerribeiro.com.br/wp-content/uploads/2024/06/Projeto-Casa-fachada-moderna-conceito-20.webp',
            title: 'Casa Luxuosa',
            area: '500 m²',
            location: 'Rio de Janeiro, RJ',
            price: 'R$ 5.000.000',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow relative">
                {/* Carrossel de Imagens */}
                <div className="h-full">
                    <Slider {...settings}>
                        {properties.map((property, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={property.image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-[75vh] object-cover"
                                />
                                {/* Overlay com Informações */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="text-white text-center space-y-2">
                                        <h2 className="text-3xl font-bold">{property.title}</h2>
                                        <p>{property.area}</p>
                                        <p>{property.location}</p>
                                        <p className="text-xl font-semibold">{property.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Botões de Navegação */}
                <div className="absolute bottom-28 left-0 right-0"> {/* Alterado de bottom-0 para bottom-10 */}
                    <div className="container mx-auto py-4 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
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
                </div>

            </main>
        </div>
    );
}

export default HomePage;
