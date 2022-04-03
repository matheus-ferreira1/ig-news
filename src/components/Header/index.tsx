import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

//A utilização da tag LINK do Next faz com que o carregamento das paginas seja muito
//mais rápido, pois o next irá recarregar apenas o conteúdo principal da pagina.
//Execução do conceito de SPA.

export function Header() {
    

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <ActiveLink activeClass={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClass={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}

//Uma forma dinamica de se colocar a classe no link ativo é usando condicional:
//<a className={asPath == '/posts' ? styles.active : ''}>Posts</a>