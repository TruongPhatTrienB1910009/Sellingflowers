"use client"
import { MainChart } from '@/components/admin/dashboard/MainChart'
import { getAllBillToday } from '@/services/admin/adminDashboardService'
import { VND } from '@/utils/VND'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Admin = () => {

    const [bills, setBills] = useState([]);
    const [billConfirm, setBillConfirm] = useState([]);
    const [billCancel, setBillCancel] = useState([]);
    const [totalamount, setTotalamount] = useState(0);
    const [totalConfirm, setTotalConfirm] = useState(0);
    const [totalCancel, setTotalCancel] = useState(0);

    const handleGetAllBillToday = async () => {
        try {
            const result = await getAllBillToday();
            if (result.EC == 0) {
                setBills(result.DT);
                console.log(result.DT);

                const temp1: any = [];
                const temp2: any = [];

                let total = 0;
                let total1 = 0;
                let total2 = 0;
                for (let i = 0; i < result.DT.length; i++) {
                    total += result.DT[i].totalamount;
                    if (result.DT[i].BillStatus.statuscode == 3) {
                        temp2.push(result.DT[i]);
                        total2 += result.DT[i].totalamount;
                    } else {
                        temp1.push(result.DT[i]);
                        total1 += result.DT[i].totalamount;
                    }
                }
                setTotalamount(total)
                setTotalConfirm(total1);
                setTotalCancel(total2);
                setBillCancel(temp2)
                setBillConfirm(temp1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetAllBillToday();
    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        }}>
            <Box sx={{
                display: 'flex',
                gap: '10px',
            }}>
                <Box sx={{
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    width: '50%',
                    height: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#e05a76'
                    }}>
                        HÓA ĐƠN HÔM NAY
                    </Box>
                    <Box sx={{
                        fontSize: '90px',
                        lineHeight: '1.5',
                        color: '#6abcf5'
                    }}>
                        {bills.length}
                    </Box>
                    <Box
                        sx={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#e05a76'
                        }}
                    >
                        TỔNG GIÁ TRỊ:  {VND.format(totalamount)}
                    </Box>
                    <Box
                        sx={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#e05a76'
                        }}
                    >
                        (Tỉ Lệ 100%)
                    </Box>
                </Box>

                <Box sx={{
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    width: '50%',
                    height: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#e05a76'
                    }}>
                        THÀNH CÔNG
                    </Box>
                    <Box sx={{
                        fontSize: '90px',
                        lineHeight: '1.5',
                        color: '#6abcf5'
                    }}>
                        {billConfirm.length}
                    </Box>
                    <Box
                        sx={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#e05a76'
                        }}
                    >
                        TỔNG GIÁ TRỊ:  {VND.format(totalConfirm)}
                    </Box>
                    <Box
                        sx={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#e05a76'
                        }}
                    >
                        {`(Tỉ Lệ ${((totalConfirm * 100) / totalamount).toFixed(2)}%)`}
                    </Box>
                </Box>

                <Box sx={{
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '10px',
                    width: '50%',
                    height: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#e05a76'
                    }}>
                        ĐƠN HỦY
                    </Box>
                    <Box sx={{
                        fontSize: '90px',
                        lineHeight: '1.5',
                        color: '#6abcf5'
                    }}>
                        {billCancel.length}
                    </Box>
                    <Box
                        sx={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#e05a76'
                        }}
                    >
                        TỔNG GIÁ TRỊ:  {VND.format(totalCancel)}
                    </Box>
                    <Box
                        sx={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#e05a76'
                        }}
                    >
                        {`(Tỉ Lệ ${((totalCancel * 100) / totalamount).toFixed(2)}%)`}
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '10px',
            }}>
                <MainChart />
            </Box>
        </Box>
    )
}

export default Admin