import { memo, useCallback, useState } from 'react'

import { convertAddress } from '@app/shared'
import { Spinner, UserAvatar } from '@app/popup/modules/shared'

interface Props {
    address: string;
    name: string;
    seed: string;
    onClick(address: string): Promise<void>;
}

export const AccountItem = memo(({ address, name, seed, onClick }: Props): JSX.Element => {
    const [loading, setLoading] = useState(false)
    const handleClick = useCallback(() => {
        setLoading(true)
        onClick(address).finally(() => setLoading(false))
    }, [address, onClick])

    return (
        <div className="change-account__account" onClick={handleClick}>
            <UserAvatar className="change-account__account-avatar" address={address} small />
            <div className="change-account__account-content">
                <div className="change-account__account-name" title={name}>
                    {name}
                </div>
                <div className="change-account__account-address">
                    {convertAddress(address)}
                    &nbsp;•&nbsp;
                    {seed}
                </div>
            </div>
            {loading && <Spinner />}
        </div>
    )
})
