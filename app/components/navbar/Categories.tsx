'use client';

import React from 'react';
import Container from "../container/Container";
import CategoryBox from "../categoryBox/CategoryBox";
import {usePathname, useSearchParams} from "next/navigation";
import {categories} from "./categoriesItems";


const Categories = () => {
    const params =  useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    

    return (
        <Container>
            <div
                className='
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                '
            >
                {
                    categories.map((item) => {
                        const {label, icon} = item;
                        return (
                            <CategoryBox
                                key={label}
                                label={label}
                                icon={icon}
                                selected={category === label}
                            />
                        )
                    })
                }
            </div>
        </Container>
    )
};

export default Categories;