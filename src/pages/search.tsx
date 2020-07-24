import React, { useEffect } from 'react';
import TheList from '@/pages/assemblies/theList';
import { useParams } from "umi";

export default () => {

    const params: any = useParams();

    useEffect(() => {
        document.title = `${params.searchKey} - share 공유 하 다.`;
    }, []);

    return (<TheList type='search' data={params} />)

}