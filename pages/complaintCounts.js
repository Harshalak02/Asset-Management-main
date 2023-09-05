const countComplaints = (orders) => {
    const counts = {
        SOS: 0,
        SEZ: 0,
        MAB: 0
    };

    /*orders.forEach(order => {
        const department = order.edepartment;


        if (department === 'SOS') {
            counts.SOS++;
        } else if (department === 'SEZ') {
            counts.SEZ++;
        } else if (department === 'MAB') {
            counts.MAB++;
        }
    });*/

    orders.forEach(order => {
        order.line_items.forEach(item => {
            const department = item.dept;

            if (department === 'SOS') {
                counts.SOS++;
            } else if (department === 'SEZ') {
                counts.SEZ++;
            } else if (department === 'MAB') {
                counts.MAB++;
            }
        });
    });

    return counts;
};

const complaintCounts = {
    SOS: 0,
    SEZ: 0,
    MAB: 0
};

export { countComplaints, complaintCounts };
