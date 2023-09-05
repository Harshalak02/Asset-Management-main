import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { countComplaints, complaintCounts } from "@/pages/complaintCounts"

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [countCategories, setCountCategories] = useState([]);
    /* const [complaintCounts, setComplaintCounts] = useState({
         SOS: 0,
         SEZ: 0,
         MAB: 0
     });*/

    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
            const counts = countComplaints(response.data);
            Object.assign(complaintCounts, counts);
            const categories = {};

            orders.forEach(order => {
                order.line_items.forEach(item => {
                    if (categories[item.category]) {
                        categories[item.category] += 1;
                    } else {
                        categories[item.category] = 1;
                    }
                });
            });
            const countCategoriesArray = Object.entries(categories).map(([name, count]) => ({ name, count }));
            setCountCategories(countCategoriesArray);
            //setCountCategories(categories);
        })
    }, []);
    /* useEffect(() => {
         const counts = {
             SOS: 0,
             SEZ: 0,
             MAB: 0
         };
 
         orders.forEach(order => {
             const department = order.edepartment.toLowerCase();
             if (department === 'sos') {
                 counts.SOS += 1;
             } else if (department === 'sez') {
                 counts.SEZ += 1;
             } else if (department === 'mab') {
                 counts.MAB += 1;
             }
         });
 
         setComplaintCounts(counts);
     }, [orders]);*/
    return (
        <Layout>
            <h1>Complaints</h1>
            <p>Total Complaints from SOS: {complaintCounts.SOS}</p>
            <p>Total Complaints from SEZ: {complaintCounts.SEZ}</p>
            <p>Total Complaints from MAB: {complaintCounts.MAB}</p>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {countCategories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Complainant</th>
                        <th>Asset</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr key={order._id}>
                            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                            <td>{order.eid},Loc:{order.edepartment}</td>
                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        Id: {l.id},Loc: {l.dept}
                                        <br />
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}
export { complaintCounts };