import { IonBackButton } from '@ionic/react'
import { chevronBack } from 'ionicons/icons'

// FIXME: Create property: backUrl
interface ICustomNavbar {
  title: string
  description?: string | null
  size?: string
  backUrl?: boolean | string
  statuses?: any
  altTitle?: string | null
}

const CustomNavbar = ({ title, description, altTitle = null, size, backUrl = false, statuses }: ICustomNavbar) => {
  return (
    <div className={size === 'small' ? 'custom-navbar custom-navbar_small' : 'custom-navbar'}>
      <div className="custom-navbar__header">
        <h1 className="custom-navbar__title">{title}</h1>
      </div>
      {statuses ? statuses : null}
      {description ? <p className="custom-navbar__description">{description}</p> : null}
      {!altTitle ? (null) : <p className="custom-navbar__alt-title">{altTitle}</p>}
    </div>
  )
}

export default CustomNavbar
