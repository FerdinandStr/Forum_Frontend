import React, { useEffect, useState } from "react"
import styles from "./Impressum.module.css"

export default function Impressum() {
    return (
        <div className="defaultPageContainer">
            <h2>Impressum</h2>
            <h3>Angaben gemäß § 5 TMG:</h3>
            <p>
                Mustermann GmbH
                <br />
                Musterstraße 1<br />
                123456 Musterstadt
            </p>
            <h3>Kontaktdaten:</h3>
            <p>
                E - Mail: max@mustermann.com <br />
                Telefon: 0123456789
            </p>
            <br></br>
            <p>
                Geschäftsführer: Max Mustermann <br />
                Sitz und Registergericht: München HRB 123456 <br />
                Ust.- Id.- Nr.: DE123456789
            </p>
            <br />
            <p>
                Die berufsrechtlichen Regelungen können über die vom Bundesministerium der Justiz und von der juris GmbH betriebenen Homepage{" "}
                <a href="http://www.gesetze-im-internet.de/" target="_blank" rel="noreferrer">
                    www.gesetze-im-internet.de
                </a>{" "}
                eingesehgen und abgerufen werden.{" "}
            </p>
            <br />
            Die Angabe in diesem Impressum gelten auch für die folgenden Online-Auftritte der Max Mustermann GmbH: <br />
            <un className="ListImpressum">
                <li>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                        Twitter
                    </a>
                </li>
                <li>
                    <a href="https://de-de.facebook.com/" target="_blank" rel="noreferrer">
                        Facebook
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                </li>
                <li>
                    <a href="https://de.linkedin.com/" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </li>
            </un>
            <h2>Disclaimer – rechtliche Hinweise</h2>
            <h3>1. Haftungsbeschränkung</h3>
            <p>
                Die Inhalte des Internetauftritts wurden mit größtmöglicher Sorgfalt und nach bestem Gewissen erstellt. Dennoch übernimmt der Anbieter
                dieser Webseite keine Gewähr für die Aktualität, Vollständigkeit und Richtigkeit der bereitgestellten Seiten und Inhalte. Als
                Diensteanbieter ist der Anbieter dieser Webseite gemäß § 7 Abs. 1 TMG für eigene Inhalte und bereitgestellte Informationen auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich; nach den §§ 8 bis 10 TMG jedoch nicht verpflichtet, die übermittelten oder
                gespeicherten fremden Informationen zu überwachen. Eine Entfernung oder Sperrung dieser Inhalte erfolgt umgehend ab dem Zeitpunkt der
                Kenntnis einer konkreten Rechtsverletzung. Eine Haftung ist erst ab dem Zeitpunkt der Kenntniserlangung möglich.
            </p>
            <h3>2. Externe Links</h3>
            <p>
                Die Webseite enthält sog. „externe Links“ (Verlinkungen) zu anderen Webseiten, auf deren Inhalt der Anbieter der Webseite keinen
                Einfluss hat. Aus diesem Grund kann der Anbieter für diese Inhalte auch keine Gewähr übernehmen. Für die Inhalte und Richtigkeit der
                bereitgestellten Informationen ist der jeweilige Anbieter der verlinkten Webseite verantwortlich. Zum Zeitpunkt der Verlinkung waren
                keine Rechtsverstöße erkennbar. Bei Bekanntwerden einer solchen Rechtsverletzung wird der Link umgehend entfernen.{" "}
            </p>
            <h3>3. Urheberrecht/Leistungsschutzrecht</h3>
            <p>
                Die auf dieser Webseite veröffentlichten Inhalte, Werke und bereitgestellten Informationen unterliegen dem deutschen Urheberrecht und
                Leistungsschutzrecht. Jede Art der Vervielfältigung, Bearbeitung, Verbreitung, Einspeicherung und jede Art der Verwertung außerhalb
                der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers. Das unerlaubte
                Kopieren/Speichern der bereitgestellten Informationen auf diesen Webseiten ist nicht gestattet und strafbar.{" "}
            </p>
            <h3>4. Datenschutz</h3>
            <p>
                Durch den Besuch des Internetauftritts können Informationen (Datum, Uhrzeit, aufgerufene Seite) über den Zugriff auf dem Server
                gespeichert werden. Es werden keine personenbezogenen (z. B. Name, Anschrift oder E-Mail-Adresse) Daten, gespeichert. Sofern
                personenbezogene Daten erhoben werden, erfolgt dies, sofern möglich, nur mit dem vorherigen Einverständnis des Nutzers der Webseite.
                Eine Weitergabe der Daten an Dritte findet ohne ausdrückliche Zustimmung des Nutzers nicht statt. Der Anbieter weist darauf hin, dass
                die Übertragung von Daten im Internet (z. B. per E-Mail) Sicherheitslücken aufweisen und ein lückenloser Schutz der Daten vor dem
                Zugriff Dritter nicht gewährleistet werden kann. Der Anbieter übernimmt keine Haftung für die durch solche Sicherheitslücken
                entstandenen Schäden. Der Verwendung der Kontaktdaten durch Dritte zur gewerblichen Nutzung wird ausdrücklich widersprochen. Es sei
                denn, der Anbieter hat zuvor seine schriftliche Einwilligung erteilt. Der Anbieter behält sich rechtliche Schritte für den Fall der
                unverlangten Zusendung von Werbeinformationen, z. B. durch Spam-Mails, vor.
            </p>
        </div>
    )
}
