import { observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'

import { Nft } from '@app/models'
import { convertAddress } from '@app/shared'
import { Button, ButtonGroup, Container, Content, Footer, Header, useViewModel } from '@app/popup/modules/shared'
import ExternalIcon from '@app/popup/assets/icons/external.svg'
import EvernameBg from '@app/popup/assets/img/evername-bg.svg'

import { NftImg } from '../NftImg'
import { NftDetailsViewModel } from './NftDetailsViewModel'

import './NftDetails.scss'

interface Props {
    nft: Nft;
}

export const NftDetails = observer(({ nft }: Props): JSX.Element => {
    const vm = useViewModel(NftDetailsViewModel, (model) => {
        model.nft = nft
    })
    const intl = useIntl()

    return (
        <Container className="nft-details">
            <Header>
                <h2 className="nft-details__header">{vm.nft.name}</h2>
            </Header>

            <Content className="nft-details__content">
                {!vm.canTransfer && (
                    <div className="nft-details__hint">
                        {intl.formatMessage({ id: 'NFT_DETAILS_HINT' })}
                    </div>
                )}
                {vm.isEvername && !vm.nft.img && (
                    <div className="nft-details__img">
                        <img src={EvernameBg} alt="" />
                        <div className="nft-details__img-label">
                            {vm.nft.name.replace(/\.ever$/i, '')}
                        </div>
                    </div>
                )}
                {vm.nft.img && (
                    <div className="nft-details__img">
                        <NftImg src={vm.nft.img} alt={vm.nft.name} />
                    </div>
                )}
                <div className="nft-details__info">
                    <div className="nft-details__info-row">
                        <div className="nft-details__info-label">
                            {intl.formatMessage({ id: 'NFT_DETAILS_CONTRACT' })}
                        </div>
                        <a
                            className="nft-details__info-value"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            href={vm.getExplorerLink(vm.nft.address)}
                        >
                            {convertAddress(vm.nft.address)}
                            <ExternalIcon className="nft-details__info-value-icon" />
                        </a>
                    </div>
                    <div className="nft-details__info-row">
                        <div className="nft-details__info-label">
                            {intl.formatMessage({ id: 'NFT_DETAILS_OWNER' })}
                        </div>
                        <a
                            className="nft-details__info-value"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            href={vm.getExplorerLink(vm.nft.owner)}
                        >
                            {convertAddress(vm.nft.owner)}
                            <ExternalIcon className="nft-details__info-value-icon" />
                        </a>
                    </div>
                    <div className="nft-details__info-row">
                        <div className="nft-details__info-label">
                            {intl.formatMessage({ id: 'NFT_DETAILS_MANAGER' })}
                        </div>
                        <a
                            className="nft-details__info-value"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            href={vm.getExplorerLink(vm.nft.manager)}
                        >
                            {convertAddress(vm.nft.manager)}
                            <ExternalIcon className="nft-details__info-value-icon" />
                        </a>
                    </div>
                    {vm.nft.balance && vm.nft.supply && (
                        <div className="nft-details__info-row">
                            <div className="nft-details__info-label">
                                {intl.formatMessage({ id: 'NFT_DETAILS_BALANCE' })}
                            </div>
                            <div className="nft-details__info-value">
                                <span className="nft-details__info-value-wrap" title={`${vm.nft.balance}/${vm.nft.supply}`}>
                                    {`${vm.nft.balance}/${vm.nft.supply}`}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </Content>

            <Footer>
                <ButtonGroup vertical>
                    {!vm.nft.balance && (
                        <Button onClick={vm.openMarketplace}>
                            {intl.formatMessage({ id: 'NFT_DETAILS_OPEN_IN_MARKETPLACE' })}
                        </Button>
                    )}
                    {vm.isOwner && (
                        <Button design="secondary" disabled={!vm.canTransfer} onClick={vm.onTransfer}>
                            {intl.formatMessage({ id: 'NFT_TRANSFER_BTN_TEXT' })}
                        </Button>
                    )}
                    {vm.nft.balance && (
                        <Button design="secondary" onClick={vm.onTransferTokens}>
                            {intl.formatMessage({ id: 'NFT_TRANSFER_TOKENS_BTN_TEXT' })}
                        </Button>
                    )}
                </ButtonGroup>
            </Footer>
        </Container>
    )
})
