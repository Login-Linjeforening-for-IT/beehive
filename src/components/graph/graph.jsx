import performance from './performance.json';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, LineChart, Line, XAxis, YAxis, AxisInterval, CartesianGrid } from 'recharts';

import './graph.css'

const baseUrl = 'http://www.shareville.no/api/v1'
const profileNumber = "378286"
const portfolioNumber = "465391"

async function apiFetch(path) {
    try {
        const response = await fetch(baseUrl + path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://www.shareville.no',
                'Referer': 'http://www.shareville.no',
            },
            mode: 'cors'
        });
        console.log(await response)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        return [null, error];
    }
}

async function formatPurchases() {
    let purchases = await apiFetch('/profiles/' + profileNumber + '/stream')["results"]
    let purchasesList = []
    for (let purchase of purchases) {
        let purchaseObject = {
            "name": purchase.object.instrument.name,
            "isin": purchase.object.instrument.instrument_id,
            "timestamp": purchase.created_at,
            "price": purchase.object.price,
            "type": purchase.object.side==1 ? "BUY" : "SELL"
        }
        purchasesList.push(purchaseObject)
    }
return purchasesList
}

function purchaseObjects() {
    let purchasesList = formatPurchases()
    let localpurchaseObjects = []
    for (let purchase of purchasesList) {
        localpurchaseObjects.push({
            "timestamp": purchase["timestamp"].split("T")[0],
            "name": purchase["name"].replace("NOK", ""),
            "price": purchase["price"].replace(".", ",") + " NOK",
            "type": purchase["type"]
        })
    }
    return localpurchaseObjects
}

function LatestPurchasesTable() {
    return (
        <table className='graphTable__table'>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
            </tr>
            {purchaseObjects().sort((a, b) => a.timestamp < b.timestamp ? 1 : -1).map((purchaseObject) => 
            <tr>
                <td>{purchaseObject.timestamp}</td>
                <td>{purchaseObject.name}</td>
                <td>{purchaseObject.type}</td>
                <td>{purchaseObject.price}</td>
            </tr>
            )}
        </table>
    )
}

function PositionsPie() {
    let positions = apiFetch('/portfolios/' + portfolioNumber + '/positions')
    const data = positions.map((position) => ({
        name: position.instrument.name,
        value: parseFloat(position.percent.toFixed(2))
    }));

    const COLORS = ['#888888', '#CCCCCC', '#DDDDDD', '#EEEEEE', '#F5F5F5'];

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
}

function FundValueGraph() {
    const data = performance.m6.map((performanceEntry) => ({
        date: performanceEntry.date,
        value: ((performanceEntry.value)-100).toFixed(1),
        }));

    const values = data.map((entry) => entry.value);

    return (
        <LineChart width={400} height={400} data={data}>
            <Line 
                unit="%"
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                name="Fund Value"
                dot={false}
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis
                dataKey="date"
            />
            <YAxis 
                unit="%"
                domain={[Math.min(...values)-0.5, Math.max(...values)+0.5]}
            />
            <Tooltip />
            <Legend />
        </LineChart>
    );
}

export {
    LatestPurchasesTable,
    FundValueGraph,
    PositionsPie
}