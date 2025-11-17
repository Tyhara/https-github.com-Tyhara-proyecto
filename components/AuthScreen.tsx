import React, { useState, useEffect } from 'react';
import { User, UserGrade } from '../types';
import { AVATAR_OPTIONS } from '../constants';
import { ArrowRightIcon, CheckCircleIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon, FamilyIcon, UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from './Icons';
import ParentPanelLogin from './ParentPanelLogin';

interface AuthScreenProps {
  onRegistrationSuccess: (tutor: User, firstPlayer: User) => void;
  onLoginSuccess: (tutor: User) => void;
}

const PrivacyPolicyModal = ({ onClose }: { onClose: () => void }) => (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-blue-900 text-white w-full max-w-lg rounded-2xl p-6 flex flex-col max-h-[90vh]">
            <h2 className="text-2xl font-bold font-fredoka text-center mb-4 text-yellow-300">Política de Privacidad y Consentimiento</h2>
            <div className="overflow-y-auto text-sm text-white/90 space-y-4">
                <p><strong>Fecha de actualización:</strong> {new Date().toLocaleDateString('es-CL')}</p>
                <p><strong>Nombre de la aplicación:</strong> Monedaventura</p>
                <p><strong>Responsable del tratamiento de datos:</strong> Equipo Monedaventura</p>
                <p><strong>Correo de contacto:</strong> soporte@monedaventura.dev</p>

                <h3 className="text-lg font-bold mt-4">1. Finalidad del tratamiento de datos</h3>
                <p>El presente documento tiene por objeto informar a los usuarios y a sus padres, madres o tutores legales sobre el tratamiento de los datos personales que se recopilan a través de la aplicación Monedaventura, destinada a niños y niñas entre segundo y sexto año básico.</p>
                <p>Los datos solicitados (nombre del usuario, correo electrónico, teléfono de contacto, contraseña y nombres de los hijos o hijas participantes) se utilizan exclusivamente para:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Crear y administrar cuentas de acceso seguras con verificación.</li>
                    <li>Permitir la participación en actividades y dinámicas del juego financiero.</li>
                    <li>Mantener comunicación con los padres o tutores.</li>
                    <li>Generar estadísticas internas de uso con fines educativos.</li>
                </ul>
                <p>En ningún caso se venderán, cederán ni divulgarán los datos personales a terceros sin el consentimiento previo del titular o su representante legal.</p>

                <h3 className="text-lg font-bold mt-4">2. Base legal del tratamiento</h3>
                <p>El tratamiento de los datos personales se realiza conforme a lo establecido en la Ley N°19.628 sobre Protección de la Vida Privada, y sus normas complementarias. En el caso de los menores de edad, el tratamiento se efectúa únicamente con la autorización expresa de sus padres, madres o tutores legales, quienes deben aceptar esta política antes de completar el registro.</p>

                <h3 className="text-lg font-bold mt-4">3. Datos recopilados</h3>
                <p>Durante el proceso de registro y uso de la aplicación, se pueden solicitar los siguientes datos:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Nombre completo del padre, madre o tutor.</li>
                    <li>Correo electrónico de contacto.</li>
                    <li>Número telefónico.</li>
                    <li>Contraseña de acceso.</li>
                    <li>Nombres y curso de los hijos o hijas participantes.</li>
                </ul>

                <h3 className="text-lg font-bold mt-4">4. Protección, Almacenamiento y Doble Autenticación</h3>
                <p>Los datos recopilados se almacenan en servidores seguros, y se aplican medidas técnicas y administrativas destinadas a garantizar su confidencialidad, integridad y disponibilidad. El acceso a esta información está restringido únicamente al personal autorizado del proyecto educativo. La verificación de la cuenta se realiza mediante un código enviado al correo electrónico proporcionado para asegurar la identidad del tutor.</p>

                <h3 className="text-lg font-bold mt-4">5. Derechos de los usuarios</h3>
                <p>De acuerdo con la Ley N°19.628, los titulares o sus representantes legales pueden ejercer los siguientes derechos respecto de sus datos personales:</p>
                <ul className="list-disc list-inside pl-4">
                    <li><strong>Acceso:</strong> Conocer qué información se mantiene registrada.</li>
                    <li><strong>Rectificación:</strong> Solicitar la corrección de datos erróneos o desactualizados.</li>
                    <li><strong>Cancelación:</strong> Solicitar la eliminación de sus datos cuando proceda.</li>
                    <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en los casos permitidos por la ley.</li>
                </ul>
                <p>Las solicitudes deben enviarse a: soporte@monedaventura.dev, indicando nombre completo y medio de contacto.</p>

                <h3 className="text-lg font-bold mt-4">6. Consentimiento informado</h3>
                <p>Al marcar la casilla “He leído y acepto los términos y condiciones y la política de privacidad”, el padre, madre o tutor legal declara que:</p>
                <ul className="list-disc list-inside pl-4">
                    <li>Autoriza expresamente el tratamiento de los datos personales propios y de sus hijos o hijas para los fines descritos.</li>
                    <li>Ha sido informado del uso, almacenamiento y protección de los datos.</li>
                    <li>Comprende que puede revocar este consentimiento en cualquier momento mediante solicitud escrita al correo de contacto indicado.</li>
                </ul>
                
                <h3 className="text-lg font-bold mt-4">7. Modificaciones</h3>
                <p>Esta política podrá ser actualizada en cualquier momento para adaptarse a cambios normativos o mejoras del servicio. Cualquier modificación será publicada dentro de la aplicación y se notificará a los usuarios registrados.</p>
            </div>
            <button onClick={onClose} className="mt-6 w-full bg-emerald-500 py-3 rounded-full font-bold text-lg hover:bg-emerald-600 transition-colors">Cerrar</button>
        </div>
    </div>
);


const AuthScreen: React.FC<AuthScreenProps> = ({ onRegistrationSuccess, onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'welcome' | 'tutorRegister' | 'tutorVerify' | 'childRegister' | 'login'>('welcome');
  
  // Tutor state
  const [tutorName, setTutorName] = useState('');
  const [tutorEmail, setTutorEmail] = useState('');
  const [tutorPassword, setTutorPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tutorPhone, setTutorPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [tempTutor, setTempTutor] = useState<User | null>(null);
  
  // Child state
  const [playerName, setPlayerName] = useState('');
  const [playerGrade, setPlayerGrade] = useState<UserGrade | ''>('');
  const [playerAvatar, setPlayerAvatar] = useState(AVATAR_OPTIONS[0]);
  const [isTutorPlayer, setIsTutorPlayer] = useState(false);

  const [error, setError] = useState('');
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  
  useEffect(() => {
    if (isTutorPlayer) {
      setPlayerName(tutorName || '');
      setPlayerGrade('Tutor');
    } else {
      setPlayerName('');
      setPlayerGrade('');
    }
  }, [isTutorPlayer, tutorName]);

  const handleTutorRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (tutorName.trim().length < 3 || !/^\S+@\S+\.\S+$/.test(tutorEmail) || !/^\d+$/.test(tutorPhone)) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.\!\@\#\$%\^&\*])/;
    if (tutorPassword.length < 8 || tutorPassword.length > 12) {
      setError('La contraseña debe tener entre 8 y 12 caracteres.');
      setShowPasswordHint(true);
      return;
    }
     if (!passwordRegex.test(tutorPassword)) {
      setError('La contraseña debe incluir mayúscula, minúscula, número y símbolo.');
      setShowPasswordHint(true);
      return;
    }
    if (tutorPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!policyAccepted) {
        setError('Debes aceptar la política de privacidad para continuar.');
        return;
    }
    
    setError('');
    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newVerificationCode);

    const newTutor: User = {
        username: tutorName,
        email: tutorEmail,
        password: tutorPassword, // In a real app, hash this
        phone: tutorPhone,
        role: 'tutor',
        children: [],
        avatarUrl: '', // Will be set in the next step
        grade: 'Tutor' 
    };
    setTempTutor(newTutor);
    setAuthMode('tutorVerify');
  };

  const handleTutorVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === generatedCode) {
      setError('');
      setAuthMode('childRegister');
    } else {
      setError('El código de verificación es incorrecto.');
    }
  };
  
  const handlePlayerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim().length < 3 || !playerGrade) {
        setError('Por favor, completa el nombre del jugador y su curso.');
        return;
    }
    if (!tempTutor) {
        setError('Error de registro. Por favor, vuelve a empezar.');
        setAuthMode('tutorRegister');
        return;
    }
    setError('');

    let finalTutor: User;
    let firstPlayer: User;

    if (isTutorPlayer) {
        // The tutor is the first player
        finalTutor = {
            ...tempTutor,
            username: playerName,
            avatarUrl: playerAvatar,
            grade: 'Tutor',
            children: [], // No children yet
        };
        firstPlayer = finalTutor;
    } else {
        // A child is the first player
        const newChild: User = {
            username: playerName,
            grade: playerGrade,
            avatarUrl: playerAvatar,
            role: 'jugador',
        };
        finalTutor = {
            ...tempTutor,
            // Tutor still needs an avatar, assign one temporarily
            avatarUrl: AVATAR_OPTIONS[AVATAR_OPTIONS.length - 1], 
            children: [newChild],
        };
        firstPlayer = newChild;
    }

    onRegistrationSuccess(finalTutor, firstPlayer);
  };
  
  const AvatarCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setPlayerAvatar(AVATAR_OPTIONS[currentIndex]);
    }, [currentIndex]);
    
    const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? AVATAR_OPTIONS.length - 1 : prev - 1));
    const handleNext = () => setCurrentIndex(prev => (prev === AVATAR_OPTIONS.length - 1 ? 0 : prev + 1));

    return (
        <div className="flex items-center justify-center gap-4 mb-6">
            <button type="button" onClick={handlePrev} className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                <ChevronLeftIcon className="w-6 h-6"/>
            </button>
            <img src={AVATAR_OPTIONS[currentIndex]} alt="avatar" className="w-24 h-24 rounded-full bg-white/20 border-4 border-yellow-400" />
            <button type="button" onClick={handleNext} className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                <ChevronRightIcon className="w-6 h-6"/>
            </button>
        </div>
    )
  }
  
  const backgroundImageUrl = '/imagenes/Monedaventura-bg.webp';
  
  const renderContent = () => {
    switch(authMode) {
      case 'tutorRegister':
        return (
          <form onSubmit={handleTutorRegister}>
            <h2 className="text-xl text-center font-bold mb-4">Paso 1: Crear cuenta de Tutor</h2>
            {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="tutorName">Tu Nombre</label>
              <input id="tutorName" type="text" value={tutorName} onChange={e => setTutorName(e.target.value)} className="w-full bg-white/20 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none" />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="tutorEmail">Tu Email</label>
              <input id="tutorEmail" type="email" value={tutorEmail} onChange={e => setTutorEmail(e.target.value)} className="w-full bg-white/20 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none" />
            </div>
             <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="tutorPhone">Tu Teléfono</label>
              <input id="tutorPhone" type="tel" value={tutorPhone} onChange={e => setTutorPhone(e.target.value)} className="w-full bg-white/20 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none" />
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <label className="text-lg font-bold" htmlFor="tutorPassword">Contraseña</label>
                <button type="button" onClick={() => setShowPasswordHint(!showPasswordHint)} className="text-sm text-yellow-300 hover:underline">(ver requisitos)</button>
              </div>
              <div className="relative">
                <input id="tutorPassword" type={showPassword ? 'text' : 'password'} value={tutorPassword} onChange={e => setTutorPassword(e.target.value)} className="w-full bg-white/20 p-3 rounded-lg mt-2 pr-10 focus:ring-2 focus:ring-yellow-400 outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 top-1/2 -translate-y-1/2 mt-1">
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
               {showPasswordHint && (
                <div className="text-xs text-yellow-200 p-2 bg-white/10 rounded-md mt-2 animate-fade-in">
                  Para mayor seguridad, tu contraseña de 8-12 caracteres debe incluir: una mayúscula (A-Z), una minúscula (a-z), un número (0-9) y un símbolo (ej: . ! @ #).
                </div>
              )}
            </div>
             <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="confirmPassword">Confirmar Contraseña</label>
              <div className="relative">
                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-white/20 p-3 rounded-lg pr-10 focus:ring-2 focus:ring-yellow-400 outline-none" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                    {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={policyAccepted} 
                        onChange={e => setPolicyAccepted(e.target.checked)}
                        className="w-5 h-5 rounded accent-yellow-400 bg-gray-700 border-gray-600 focus:ring-yellow-500"
                    />
                    <span className="text-sm">
                        He leído y acepto la{' '}
                        <button type="button" onClick={() => setShowPolicyModal(true)} className="text-yellow-300 hover:underline font-bold">
                            Política de Privacidad
                        </button>.
                    </span>
                </label>
            </div>
            <button type="submit" disabled={!policyAccepted} className="w-full bg-yellow-400 text-blue-950 font-bold font-fredoka text-xl py-3 rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
              Siguiente
            </button>
             <button onClick={() => setAuthMode('welcome')} className="w-full text-center mt-4 text-cyan-300 hover:underline">Volver</button>
          </form>
        );
       case 'tutorVerify':
        return (
          <form onSubmit={handleTutorVerify}>
            <h2 className="text-xl text-center font-bold mb-2">Verificación de Cuenta</h2>
            <p className="text-center text-white/80 mb-4">Hemos enviado un código a tu email ({tutorEmail}).</p>
            <p className="text-center text-yellow-200 text-sm mb-4">(Pista: el código es {generatedCode})</p>
            {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}
            <div className="mb-6">
              <label className="block text-lg font-bold mb-2" htmlFor="verificationCode">Código de Verificación</label>
              <input id="verificationCode" type="text" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} className="w-full bg-white/20 p-3 rounded-lg text-center text-2xl tracking-[.5em]" maxLength={6} />
            </div>
            <button type="submit" className="w-full bg-emerald-500 text-white font-bold font-fredoka text-xl py-3 rounded-full flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors">
              <LockClosedIcon className="w-5 h-5"/> Verificar y Continuar
            </button>
             <button onClick={() => setAuthMode('tutorRegister')} className="w-full text-center mt-4 text-cyan-300 hover:underline">Volver</button>
          </form>
        );
      case 'childRegister':
        return (
           <form onSubmit={handlePlayerRegister}>
            <h2 className="text-xl text-center font-bold mb-4">Paso 2: Crea el primer perfil</h2>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}

            <div className="mb-4 bg-white/10 p-3 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={isTutorPlayer} 
                        onChange={e => setIsTutorPlayer(e.target.checked)}
                        className="w-5 h-5 rounded accent-yellow-400 bg-gray-700 border-gray-600 focus:ring-yellow-500"
                    />
                    <span className="font-bold">Soy el primer jugador (Tutor)</span>
                </label>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="playerName">Nombre del Jugador</label>
              <input id="playerName" type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} disabled={isTutorPlayer} className="w-full bg-white/20 p-3 rounded-lg disabled:bg-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2" htmlFor="playerGrade">Curso</label>
              <select id="playerGrade" value={playerGrade} onChange={e => setPlayerGrade(e.target.value as UserGrade)} disabled={isTutorPlayer} className="w-full bg-white/20 p-3 rounded-lg appearance-none text-center disabled:bg-gray-700">
                {isTutorPlayer ? <option value="Tutor">Tutor</option> :
                <>
                    <option value="">Selecciona un curso</option>
                    <option value="2º Básico">2º Básico</option>
                    <option value="3º Básico">3º Básico</option>
                    <option value="4º Básico">4º Básico</option>
                    <option value="5º Básico">5º Básico</option>
                    <option value="6º Básico">6º Básico</option>
                </>}
              </select>
            </div>
            <label className="block text-lg font-bold mb-2 text-center">Elige un Avatar</label>
            <AvatarCarousel />
            <button type="submit" className="w-full bg-emerald-500 text-white font-bold font-fredoka text-xl py-3 rounded-full hover:bg-emerald-600 transition-colors">
              ¡Comenzar Aventura!
            </button>
             <button onClick={() => setAuthMode('tutorVerify')} className="w-full text-center mt-4 text-cyan-300 hover:underline">Volver</button>
          </form>
        );
      case 'login':
        return <ParentPanelLogin onSuccess={onLoginSuccess} onBack={() => setAuthMode('welcome')} />;
      case 'welcome':
      default:
        return (
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-fredoka drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tight">
              <span className="text-yellow-300">Moneda</span><span className="text-white">ventura</span>
            </h1>
            <p className="mt-4 mb-8 text-lg text-white/90">La aventura de finanzas para niños</p>
            <div className="space-y-4">
               <button onClick={() => setAuthMode('tutorRegister')} className="w-full max-w-sm mx-auto bg-yellow-400 text-blue-950 font-bold font-fredoka text-xl py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-colors block">
                Crear Cuenta Familiar
              </button>
               <button onClick={() => setAuthMode('login')} className="w-full max-w-sm mx-auto bg-emerald-500 text-white font-bold font-fredoka text-xl py-3 rounded-full shadow-lg hover:bg-emerald-600 transition-colors block">
                Iniciar Sesión
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div 
        className="w-full h-full bg-cover bg-center flex items-center justify-center p-4"
        style={{backgroundImage: `url(${backgroundImageUrl})`}}
    >
      <div className="w-full max-w-md bg-blue-800/80 backdrop-blur-lg text-white p-6 sm:p-8 rounded-2xl shadow-2xl">
        {renderContent()}
      </div>
      {showPolicyModal && <PrivacyPolicyModal onClose={() => setShowPolicyModal(false)} />}
    </div>
  );
};

export default AuthScreen;