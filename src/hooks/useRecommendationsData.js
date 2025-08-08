
"use client"
import { useState, useEffect, useRef } from 'react';
// import axiosInstance from '../helpers/axios';
import clientAxiosInstance from '@/lib/clientAxios';
const fetchStockPrice = async (symbol) => {
    try {
        await fetch(
            `https://finhub-socket-server.onrender.com/subscribe/${symbol}`
        );
        const response = await fetch(
            `https://finhub-socket-server.onrender.com/get/${symbol}`
        );
        const result = await response.json();
        const tick = result?.tick;
        if (!tick) return null;
        const price =
            typeof tick.last_price === 'number'
                ? tick.last_price
                : typeof tick.ohlc?.close === 'number'
                    ? tick.ohlc.close
                    : null;
        return price ? Math.round(price) : null;
    } catch (error) {
        console.error(`[fetchStockPrice] Error for ${symbol}:`, error);
        return null;
    }
};

export const useRecommendationsData = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [cmpMap, setCmpMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    const fetchRecommendations = async () => {
        setIsLoading(true);
        try {
            const { data } = await clientAxiosInstance.get(
                '/v1/recommendations/getRecommendations'
            );
            if (data.success) {
                setRecommendations(data.data);
                setError(null);
            }
        } catch (err) {
            console.error('Error fetching recommendations:', err);
            setError('Failed to fetch recommendations.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllCMPs = async (currentRecommendations) => {
        if (!currentRecommendations || !currentRecommendations.length) return;
        const prices = {};

        await Promise.all(
            currentRecommendations.map(async (rec) => {
                try {
                    let price = null;
                    if (rec.assetType === 'Stock') {
                        const res = await clientAxiosInstance.get(
                            `/v1/stocks/get/${rec.mutualFund}`
                        );
                        const instrument_token = res.data.data.instrument_token;
                        price = await fetchStockPrice(instrument_token);
                    } else if (rec.assetType === 'Mutual Fund') {
                        const res = await clientAxiosInstance.get(
                            `/v1/mutual-funds/get/${rec.mutualFund}`
                        );
                        price = res.data.data.nav;
                    }
                    prices[rec.mutualFund] = price;
                } catch (error) {
                    console.error(
                        `[fetchAllCMPs] Error for ${rec.name}:`,
                        error
                    );
                }
            })
        );
        setCmpMap(prices);
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    useEffect(() => {
        if (recommendations.length > 0) {
            fetchAllCMPs(recommendations);
            intervalRef.current = setInterval(() => fetchAllCMPs(recommendations), 2000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [recommendations]);

    return { recommendations, cmpMap, isLoading, error, fetchRecommendations };
};