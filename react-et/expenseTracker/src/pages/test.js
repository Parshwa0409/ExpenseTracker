const data = [
    {
        "month": 1,
        "totalExpense": 27000,
        "year": 2023
    },
    {
        "month": 2,
        "totalExpense": 26800,
        "year": 2023
    },
    {
        "month": 3,
        "totalExpense": 27000,
        "year": 2023
    },
    {
        "month": 4,
        "totalExpense": 23100,
        "year": 2023
    },
    {
        "month": 5,
        "totalExpense": 28000,
        "year": 2023
    },
    {
        "month": 6,
        "totalExpense": 27400,
        "year": 2023
    },
    {
        "month": 7,
        "totalExpense": 23000,
        "year": 2023
    },
    {
        "month": 8,
        "totalExpense": 28800,
        "year": 2023
    },
    {
        "month": 9,
        "totalExpense": 26300,
        "year": 2023
    },
    {
        "month": 10,
        "totalExpense": 23800,
        "year": 2023
    },
    {
        "month": 11,
        "totalExpense": 27600,
        "year": 2023
    },
    {
        "month": 12,
        "totalExpense": 27500,
        "year": 2023
    },
    {
        "month": 1,
        "totalExpense": 27000,
        "year": 2024
    },
    {
        "month": 2,
        "totalExpense": 27500,
        "year": 2024
    },
    {
        "month": 3,
        "totalExpense": 26700,
        "year": 2024
    },
    {
        "month": 4,
        "totalExpense": 23400,
        "year": 2024
    },
    {
        "month": 5,
        "totalExpense": 28000,
        "year": 2024
    },
    {
        "month": 6,
        "totalExpense": 27100,
        "year": 2024
    },
    {
        "month": 7,
        "totalExpense": 23000,
        "year": 2024
    },
    {
        "month": 8,
        "totalExpense": 28800,
        "year": 2024
    },
    {
        "month": 9,
        "totalExpense": 26600,
        "year": 2024
    },
    {
        "month": 10,
        "totalExpense": 23800,
        "year": 2024
    },
    {
        "month": 11,
        "totalExpense": 27300,
        "year": 2024
    },
    {
        "month": 12,
        "totalExpense": 27800,
        "year": 2024
    },
    {
        "month": 1,
        "totalExpense": 27000,
        "year": 2025
    },
    {
        "month": 2,
        "totalExpense": 26800,
        "year": 2025
    },
    {
        "month": 3,
        "totalExpense": 27000,
        "year": 2025
    },
    {
        "month": 4,
        "totalExpense": 23100,
        "year": 2025
    },
    {
        "month": 5,
        "totalExpense": 28000,
        "year": 2025
    },
    {
        "month": 6,
        "totalExpense": 27400,
        "year": 2025
    },
    {
        "month": 7,
        "totalExpense": 23000,
        "year": 2025
    },
    {
        "month": 8,
        "totalExpense": 28500,
        "year": 2025
    },
    {
        "month": 9,
        "totalExpense": 26600,
        "year": 2025
    },
    {
        "month": 10,
        "totalExpense": 23800,
        "year": 2025
    },
    {
        "month": 11,
        "totalExpense": 27300,
        "year": 2025
    },
    {
        "month": 12,
        "totalExpense": 27800,
        "year": 2025
    }
]


function formatLineChart(data) {
    const res = {};
    data.forEach(item => {
        res[item.year] = {
            label: [...res[item.year]?.label || [] , item.month],
            data: [...res[item.year]?.data || [] , item.totalExpense]
        };
    });

    return res;
}

const r = formatLineChart(data);
console.log(r);