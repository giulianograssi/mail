<template>
    <div id="account-form">
        <form method="post">
        <div class="hidden-visually">
            <!-- Hack for Safari and Chromium/Chrome which ignore autocomplete="off" -->
            <input type="text" id="fake_user" name="fake_user"
                autocomplete="off" tabindex="-1">
            <input type="password" id="fake_password" name="fake_password"
                autocomplete="off" tabindex="-1">
        </div>
        <fieldset>
            <div id="emptycontent" ref="emptyContent">
                <div class="icon-mail"></div>
                <h2>{{ t('mail', 'Connect your mail account') }}</h2>
            </div>
            <p class="grouptop">
                <input type="text"
                    name="account-name"
                    :placeholder="t('mail', 'Name')"
                    :value="config.name"
                    autofocus />
            </p>
            <p class="groupmiddle">
                <input type="email"
                    ref="mailAddress"
                    name="mail-address"
                    :placeholder="t('mail', 'Mail Address')"
                    :value="config.emailAddress"
                    required />
            </p>
            <p class="groupbottom">
                <input type="password"
                    name="mail-password"
                    ref="mailPassword"
                    :placeholder="t('mail', 'Password')"
                    :value="config.password"
                    required />
            </p>

            <a class="toggle-manual-mode icon-caret-dark" v-on:click.stop="toggleManualMode">{{ t('mail', 'Manual configuration') }}</a>

            <div class="manual-inputs" ref="manualInputs">
                <p class="grouptop">
                    <input type="text"
                        name="imap-host"
                        ref="imapHost"
                        :placeholder="t('mail', 'IMAP Host')"
                        :value="config.imapHost" />
                </p>
                <p class="groupmiddle" id="setup-imap-ssl">
                    <select id="setup-imap-ssl-mode"
                        ref="imapSslMode"
                        name="imap-sslmode"
                        :title="t('mail', 'IMAP security')">
                        <option value="none">{{ t('mail', 'None') }}</option>
                        <option value="ssl">{{ t('mail', 'SSL/TLS') }}</option>
                        <option value="tls">{{ t('mail', 'STARTTLS') }}</option>
                    </select>
                </p>
                <p class="groupmiddle">
                    <input type="number"
                        ref="imapPort"
                        name="imap-port"
                        :placeholder="t('mail', 'IMAP Port')"
                        :value="config.imapPort" />
                </p>
                <p class="groupmiddle">
                    <input type="text"
                        ref="imapUser"
                        name="imap-user"
                        :placeholder="t('mail', 'IMAP User')"
                        :value="config.imapUser" />
                </p>
                <p class="groupbottom">
                    <input type="password"
                        ref="imapPassword"
                        name="imap-password"
                        :placeholder="t('mail', 'IMAP Password')"
                        :value="config.imapPassword"
                        required />
                </p>
                <p class="grouptop">
                    <input type="text"
                        ref="smtpHost"
                        name="smtp-host"
                        :placeholder="t('mail', 'SMTP Host')"
                        :value="config.smtpHost" />
                </p>
                <p class="groupmiddle" id="setup-smtp-ssl">
                    <select id="setup-smtp-ssl-mode"
                        ref="smtpSslMode"
                        name="mail-smtp-sslmode"
                        :title="t('mail', 'SMTP security')">
                        <option value="none">{{ t('mail', 'None') }}</option>
                        <option value="ssl">{{ t('mail', 'SSL/TLS') }}</option>
                        <option value="tls">{{ t('mail', 'STARTTLS') }}</option>
                    </select>
                </p>
                <p class="groupmiddle">
                    <input type="number"
                        ref="smtpPort"
                        name="smtp-port"
                        :placeholder="t('mail', 'SMTP Port')"
                        :value="config.smtpPort" />
                </p>
                <p class="groupmiddle">
                    <input type="text"
                        ref="smtpUser"
                        name="smtp-user"
                        :placeholder="t('mail', 'SMTP User')"
                        :value="config.smtpUser" />
                </p>
                <p class="groupbottom">
                    <input type="password"
                        ref="smtpPassword"
                        name="smtp-password"
                        :placeholder="t('mail', 'SMTP Password')"
                        :value="config.smtpPassword"
                        required />
                </p>
            </div>

            <input type="submit"
                ref="submitButton"
                class="primary"
                :value="t('mail', 'Connect')"/>
            </fieldset>
        </form>
    </div>
</template>

<script>
	export default {
        name: "AccountForm",
        data() {
			return {
                firstToggle: true,
				config: {
                    accountName: $('#user-displayname').text() || '',
                    emailAddress: $('#user-email').text() || '',
                    password: '',
                    accountName: '',
                    autoDetect: true,
                    imapPort: 993,
                    imapSslMode: 'ssl',
                    smtpPort: 587,
                    smtpSslMode: 'tls'
                }
			}
        },
        methods: {
            toggleManualMode: function() {
                this.config.autoDetect = !this.config.autoDetect;

                $(this.$refs.manualInputs).slideToggle();
                this.$refs.imapHost.focus();

                if (this.config.autoDetect) {
                    if (this.firstToggle) {
                        // Manual mode opened for the first time
                        // -> copy email, password for imap&smtp
                        let email = $(this.$refs.mailAddress).val();
                        let password = $(this.$refs.mailPassword).val();

                        $(this.$refs.imapUser).val(email);
                        $(this.$refs.imapPassword).val(password);
                        $(this.$refs.smtpUser).val(email);
                        $(this.$refs.smtpPassword).val(password);
                        this.firstToggle = false;
                    }

                    $(this.$refs.mailPassword).slideToggle(function() {
                        $(this.$refs.mailAddress)
                            .parent()
                            .removeClass('groupmiddle')
                            .addClass('groupbottom');
                        this.$refs.imapHost.focus();
                    });
                }
            },
            toggleManualModeZZ: function() {
                e.stopPropagation();
                this._config.autoDetect = !this._config.autoDetect;

                this.getUI('manualInputs').slideToggle();
                this.getUI('imapHost').focus();

                if (!this._config.autoDetect) {
                    if (this.firstToggle) {
                        // Manual mode opened for the first time
                        // -> copy email, password for imap&smtp
                        var email = this.getUI('mailAddress').val();
                        var password = this.getUI('mailPassword').val();
                        this.getUI('imapUser').val(email);
                        this.getUI('imapPassword').val(password);
                        this.getUI('smtpUser').val(email);
                        this.getUI('smtpPassword').val(password);
                        this.firstToggle = false;
                    }

                    var _this = this;
                    this.getUI('mailPassword').slideToggle(function() {
                        _this.getUI('mailAddress').parent()
                            .removeClass('groupmiddle').addClass('groupbottom');

                        // Focus imap host input
                        _this.getUI('imapHost').focus();
                    });
                } else {
                    this.getUI('mailPassword').slideToggle();
                    this.getUI('mailAddress').parent()
                        .removeClass('groupbottom').addClass('groupmiddle');
                }
            }
        }
    }

    // RUN THIS ON INIT:
    // if (this._config.autoDetect) {
    //     this.getUI('mailPassword').show();
    //     this.getUI('manualInputs').hide();
    // } else {
    //     this.getUI('mailPassword').hide();
    // }
</script>
