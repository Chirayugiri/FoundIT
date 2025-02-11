import React, { useEffect, useState } from 'react';
import Bar from './components/Bar';
import Category from './components/Category';
import Footer from './components/Footer';
import ProductCard from "./components/ProductCard"
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Loader from './components/Loader';


function Home() {
    const [items, setItems] = useState([]);
    const [recentItems, setRecentItems] = useState([]);

    const [isLoading, setLoading] = useState(false);

    function formatDate(timestamp) {
        if (timestamp && timestamp.seconds) {
            // Convert seconds to milliseconds to create a Date object
            const date = new Date(timestamp.seconds * 1000);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options); // Format to "Dec 12, 2024"
        }
        return "Invalid Date";
    }


    useEffect(() => {
        async function fetchAllItems() {
            setLoading(true)
            try {
                const result = await fetch('http://localhost:9000/product/allProducts', {
                    method: 'GET',
                });
                const data = await result.json(); 
                setItems(data);
                setLoading(false);
                
            } catch (error) {
                console.error('Error fetching items:', error); 
            }
        }

        async function fetchRecentItems() {
            try {
                const result = await fetch('http://localhost:9000/product/recent', {
                    method: 'GET',
                });
                const data = await result.json(); 
                setRecentItems(data); 
            } catch (error) {
                console.error('Error fetching items:', error); // Error handling for fetch
            }
        }

        fetchRecentItems();
        fetchAllItems();
    }, []);


    return (
        <>
            <Hero />
            <Category state={{ items }} />
            <Link to='/allproducts' state={{ items }}><Bar title={"Recent"} /></Link>

            <div className='flex'>
                {
                    isLoading === true ? <Loader /> 
                    :
                    // if no recent items then show 3 items from items array
                    recentItems.length == 0 ?
                        items.slice(0, 3).map((item) => {
                            return (
                                <Link to='/productDetail' state={{ item }} key={item.uid}>
                                    <ProductCard
                                        path={item.imageUrl}
                                        title={item.title}
                                        date={formatDate(item.date)}
                                        category={item.itemType}
                                    />
                                </Link>
                            );
                        }) :
                        recentItems.slice(0, 3).map((item) => {
                            return (
                                <Link to='/productDetail' state={{ item }} key={item.uid}>
                                    <ProductCard
                                        path={item.imageUrl}
                                        title={item.title}
                                        date={formatDate(item.date)}
                                        category={item.itemType}
                                    />
                                </Link>
                            );
                        })
                }
            </div>


            <Link to='/allproducts' state={{ items }}><Bar title={"Found"} /></Link>
            <div className='flex'>
                {
                    isLoading === true ? <Loader /> 
                    :
                    items.slice(0, 6).map((item) => {
                        return (
                            <Link to='/productDetail' state={{ item }} key={item.uid}>
                                <ProductCard
                                    path={item.imageUrl}
                                    title={item.title}
                                    date={formatDate(item.date)}
                                    category={item.itemType}
                                />
                            </Link>
                        )
                    })
                }
            </div>
            <Footer />
            {/* <Loader /> */}
        </>
    )
}

export default Home