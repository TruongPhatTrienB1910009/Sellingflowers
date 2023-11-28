'use client'
import * as React from 'react';
import '@/styles/footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';

// TODO remove, this demo shouldn't need to reset the theme.

export default function StickyFooter() {
    return (
        <footer>
            <div className="footer">

                <div className="row">
                    GREEN. © 2021 Copy - All rights reserved || Designed By: TRUONG PHAT TRIEN
                </div>
            </div>
        </footer>
    );
}