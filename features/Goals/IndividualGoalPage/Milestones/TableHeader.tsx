import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const TableHeader = () => (
    <>
        <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '15%' }} />
        </colgroup>
        <tr>
            <th>
                <AiOutlineLoading3Quarters />
            </th>
            <th>
                <span>Name</span>
            </th>
            <th>
                <span>Deadline</span>
            </th>
            <th></th>
        </tr>
    </>
)
