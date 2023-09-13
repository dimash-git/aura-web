import './styles.css'

type UserHeaderProps = {
  email: string
}

function UserHeader({ email }: UserHeaderProps): JSX.Element {
  return (
    <section className='user-header'>
      <div className='user-header__content'>{email}</div>
      <div className='user-header__icon'>{email.at(0)?.toUpperCase()}</div>
    </section>
  )
}

export default UserHeader
