PGDMP      *                }            huertaconecta    17.5    17.5 G               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16556    huertaconecta    DATABASE     �   CREATE DATABASE huertaconecta WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE huertaconecta;
                     postgres    false                        2615    16557    huertaconecta    SCHEMA        CREATE SCHEMA huertaconecta;
    DROP SCHEMA huertaconecta;
                     postgres    false            �            1259    16558    cultivos    TABLE     �   CREATE TABLE huertaconecta.cultivos (
    id_cultivo integer NOT NULL,
    titulo_cultivo character varying(100) NOT NULL,
    descripcion_cultivo character varying(500)
);
 #   DROP TABLE huertaconecta.cultivos;
       huertaconecta         heap r       postgres    false    5            �            1259    16563    cultivos_id_cultivo_seq    SEQUENCE     �   CREATE SEQUENCE huertaconecta.cultivos_id_cultivo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE huertaconecta.cultivos_id_cultivo_seq;
       huertaconecta               postgres    false    5    217                       0    0    cultivos_id_cultivo_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE huertaconecta.cultivos_id_cultivo_seq OWNED BY huertaconecta.cultivos.id_cultivo;
          huertaconecta               postgres    false    218            �            1259    16564    estados_tareas    TABLE     �   CREATE TABLE huertaconecta.estados_tareas (
    id_estado_tarea integer NOT NULL,
    descripcion_estado_tarea character varying(50) NOT NULL
);
 )   DROP TABLE huertaconecta.estados_tareas;
       huertaconecta         heap r       postgres    false    5            �            1259    16567 "   estados_tareas_id_estado_tarea_seq    SEQUENCE     �   CREATE SEQUENCE huertaconecta.estados_tareas_id_estado_tarea_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE huertaconecta.estados_tareas_id_estado_tarea_seq;
       huertaconecta               postgres    false    5    219                       0    0 "   estados_tareas_id_estado_tarea_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE huertaconecta.estados_tareas_id_estado_tarea_seq OWNED BY huertaconecta.estados_tareas.id_estado_tarea;
          huertaconecta               postgres    false    220            �            1259    16568    huertas    TABLE     "  CREATE TABLE huertaconecta.huertas (
    id_huerta integer NOT NULL,
    nombre_huerta character varying(100) NOT NULL,
    direccion_huerta character varying(255) NOT NULL,
    descripcion character varying(500),
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 "   DROP TABLE huertaconecta.huertas;
       huertaconecta         heap r       postgres    false    5            �            1259    16574    huertas_id_huerta_seq    SEQUENCE     �   CREATE SEQUENCE huertaconecta.huertas_id_huerta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE huertaconecta.huertas_id_huerta_seq;
       huertaconecta               postgres    false    5    221                       0    0    huertas_id_huerta_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE huertaconecta.huertas_id_huerta_seq OWNED BY huertaconecta.huertas.id_huerta;
          huertaconecta               postgres    false    222            �            1259    16575    publicaciones    TABLE       CREATE TABLE huertaconecta.publicaciones (
    id_publicacion integer NOT NULL,
    titulo_post character varying(200) NOT NULL,
    contenido_post text NOT NULL,
    fecha_post timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_usuarios_huertas integer
);
 (   DROP TABLE huertaconecta.publicaciones;
       huertaconecta         heap r       postgres    false    5            �            1259    16581     publicaciones_id_publicacion_seq    SEQUENCE     �   CREATE SEQUENCE huertaconecta.publicaciones_id_publicacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE huertaconecta.publicaciones_id_publicacion_seq;
       huertaconecta               postgres    false    223    5                       0    0     publicaciones_id_publicacion_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE huertaconecta.publicaciones_id_publicacion_seq OWNED BY huertaconecta.publicaciones.id_publicacion;
          huertaconecta               postgres    false    224            �            1259    16582    tareas    TABLE     �  CREATE TABLE huertaconecta.tareas (
    id_tarea integer NOT NULL,
    titulo_tarea character varying(100) NOT NULL,
    descripcion_tarea character varying(500),
    fecha_inicio_tarea date NOT NULL,
    fecha_fin_tarea date,
    id_estado_tarea integer NOT NULL,
    id_cultivo integer,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_usuarios_huertas integer,
    CONSTRAINT tareas_check CHECK ((fecha_fin_tarea >= fecha_inicio_tarea))
);
 !   DROP TABLE huertaconecta.tareas;
       huertaconecta         heap r       postgres    false    5            �            1259    16589    tareas_id_tarea_seq    SEQUENCE     �   CREATE SEQUENCE huertaconecta.tareas_id_tarea_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE huertaconecta.tareas_id_tarea_seq;
       huertaconecta               postgres    false    225    5                       0    0    tareas_id_tarea_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE huertaconecta.tareas_id_tarea_seq OWNED BY huertaconecta.tareas.id_tarea;
          huertaconecta               postgres    false    226            �            1259    16590    tipos_usuarios    TABLE     �   CREATE TABLE huertaconecta.tipos_usuarios (
    id_tipo_usuario integer NOT NULL,
    descripcion_tipo_usuario character varying(50) NOT NULL
);
 )   DROP TABLE huertaconecta.tipos_usuarios;
       huertaconecta         heap r       postgres    false    5            �            1259    16593 "   tipos_usuarios_id_tipo_usuario_seq    SEQUENCE     �   CREATE SEQUENCE huertaconecta.tipos_usuarios_id_tipo_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE huertaconecta.tipos_usuarios_id_tipo_usuario_seq;
       huertaconecta               postgres    false    5    227                       0    0 "   tipos_usuarios_id_tipo_usuario_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE huertaconecta.tipos_usuarios_id_tipo_usuario_seq OWNED BY huertaconecta.tipos_usuarios.id_tipo_usuario;
          huertaconecta               postgres    false    228            �            1259    16594    usuarios    TABLE     o  CREATE TABLE huertaconecta.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    correo character varying(255) NOT NULL,
    contrasena character varying(255) NOT NULL,
    id_tipo_usuario integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 #   DROP TABLE huertaconecta.usuarios;
       huertaconecta         heap r       postgres    false    5            �            1259    16600    usuarios_huertas    TABLE     �   CREATE TABLE huertaconecta.usuarios_huertas (
    id_usuarios_huertas integer NOT NULL,
    id_usuario integer NOT NULL,
    id_huerta integer NOT NULL,
    fecha_vinculacion date DEFAULT CURRENT_DATE NOT NULL
);
 +   DROP TABLE huertaconecta.usuarios_huertas;
       huertaconecta         heap r       postgres    false    5            �            1259    16604 '   usuarios_huertas_id_usuarios_huerta_seq    SEQUENCE     �   CREATE SEQUENCE huertaconecta.usuarios_huertas_id_usuarios_huerta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE huertaconecta.usuarios_huertas_id_usuarios_huerta_seq;
       huertaconecta               postgres    false    230    5                       0    0 '   usuarios_huertas_id_usuarios_huerta_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE huertaconecta.usuarios_huertas_id_usuarios_huerta_seq OWNED BY huertaconecta.usuarios_huertas.id_usuarios_huertas;
          huertaconecta               postgres    false    231            �            1259    16605    usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE huertaconecta.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE huertaconecta.usuarios_id_usuario_seq;
       huertaconecta               postgres    false    229    5                       0    0    usuarios_id_usuario_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE huertaconecta.usuarios_id_usuario_seq OWNED BY huertaconecta.usuarios.id_usuario;
          huertaconecta               postgres    false    232            D           2604    16606    cultivos id_cultivo    DEFAULT     �   ALTER TABLE ONLY huertaconecta.cultivos ALTER COLUMN id_cultivo SET DEFAULT nextval('huertaconecta.cultivos_id_cultivo_seq'::regclass);
 I   ALTER TABLE huertaconecta.cultivos ALTER COLUMN id_cultivo DROP DEFAULT;
       huertaconecta               postgres    false    218    217            E           2604    16607    estados_tareas id_estado_tarea    DEFAULT     �   ALTER TABLE ONLY huertaconecta.estados_tareas ALTER COLUMN id_estado_tarea SET DEFAULT nextval('huertaconecta.estados_tareas_id_estado_tarea_seq'::regclass);
 T   ALTER TABLE huertaconecta.estados_tareas ALTER COLUMN id_estado_tarea DROP DEFAULT;
       huertaconecta               postgres    false    220    219            F           2604    16608    huertas id_huerta    DEFAULT     �   ALTER TABLE ONLY huertaconecta.huertas ALTER COLUMN id_huerta SET DEFAULT nextval('huertaconecta.huertas_id_huerta_seq'::regclass);
 G   ALTER TABLE huertaconecta.huertas ALTER COLUMN id_huerta DROP DEFAULT;
       huertaconecta               postgres    false    222    221            H           2604    16609    publicaciones id_publicacion    DEFAULT     �   ALTER TABLE ONLY huertaconecta.publicaciones ALTER COLUMN id_publicacion SET DEFAULT nextval('huertaconecta.publicaciones_id_publicacion_seq'::regclass);
 R   ALTER TABLE huertaconecta.publicaciones ALTER COLUMN id_publicacion DROP DEFAULT;
       huertaconecta               postgres    false    224    223            J           2604    16610    tareas id_tarea    DEFAULT     �   ALTER TABLE ONLY huertaconecta.tareas ALTER COLUMN id_tarea SET DEFAULT nextval('huertaconecta.tareas_id_tarea_seq'::regclass);
 E   ALTER TABLE huertaconecta.tareas ALTER COLUMN id_tarea DROP DEFAULT;
       huertaconecta               postgres    false    226    225            L           2604    16611    tipos_usuarios id_tipo_usuario    DEFAULT     �   ALTER TABLE ONLY huertaconecta.tipos_usuarios ALTER COLUMN id_tipo_usuario SET DEFAULT nextval('huertaconecta.tipos_usuarios_id_tipo_usuario_seq'::regclass);
 T   ALTER TABLE huertaconecta.tipos_usuarios ALTER COLUMN id_tipo_usuario DROP DEFAULT;
       huertaconecta               postgres    false    228    227            M           2604    16612    usuarios id_usuario    DEFAULT     �   ALTER TABLE ONLY huertaconecta.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('huertaconecta.usuarios_id_usuario_seq'::regclass);
 I   ALTER TABLE huertaconecta.usuarios ALTER COLUMN id_usuario DROP DEFAULT;
       huertaconecta               postgres    false    232    229            O           2604    16613 $   usuarios_huertas id_usuarios_huertas    DEFAULT     �   ALTER TABLE ONLY huertaconecta.usuarios_huertas ALTER COLUMN id_usuarios_huertas SET DEFAULT nextval('huertaconecta.usuarios_huertas_id_usuarios_huerta_seq'::regclass);
 Z   ALTER TABLE huertaconecta.usuarios_huertas ALTER COLUMN id_usuarios_huertas DROP DEFAULT;
       huertaconecta               postgres    false    231    230                       0    16558    cultivos 
   TABLE DATA           Z   COPY huertaconecta.cultivos (id_cultivo, titulo_cultivo, descripcion_cultivo) FROM stdin;
    huertaconecta               postgres    false    217   �`                 0    16564    estados_tareas 
   TABLE DATA           Z   COPY huertaconecta.estados_tareas (id_estado_tarea, descripcion_estado_tarea) FROM stdin;
    huertaconecta               postgres    false    219   �b                 0    16568    huertas 
   TABLE DATA           q   COPY huertaconecta.huertas (id_huerta, nombre_huerta, direccion_huerta, descripcion, fecha_creacion) FROM stdin;
    huertaconecta               postgres    false    221   �b                 0    16575    publicaciones 
   TABLE DATA           |   COPY huertaconecta.publicaciones (id_publicacion, titulo_post, contenido_post, fecha_post, id_usuarios_huertas) FROM stdin;
    huertaconecta               postgres    false    223   kd                 0    16582    tareas 
   TABLE DATA           �   COPY huertaconecta.tareas (id_tarea, titulo_tarea, descripcion_tarea, fecha_inicio_tarea, fecha_fin_tarea, id_estado_tarea, id_cultivo, fecha_creacion, id_usuarios_huertas) FROM stdin;
    huertaconecta               postgres    false    225   #e       
          0    16590    tipos_usuarios 
   TABLE DATA           Z   COPY huertaconecta.tipos_usuarios (id_tipo_usuario, descripcion_tipo_usuario) FROM stdin;
    huertaconecta               postgres    false    227   �e                 0    16594    usuarios 
   TABLE DATA           |   COPY huertaconecta.usuarios (id_usuario, nombre, apellido, correo, contrasena, id_tipo_usuario, fecha_creacion) FROM stdin;
    huertaconecta               postgres    false    229   f                 0    16600    usuarios_huertas 
   TABLE DATA           p   COPY huertaconecta.usuarios_huertas (id_usuarios_huertas, id_usuario, id_huerta, fecha_vinculacion) FROM stdin;
    huertaconecta               postgres    false    230   �g                  0    0    cultivos_id_cultivo_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('huertaconecta.cultivos_id_cultivo_seq', 13, true);
          huertaconecta               postgres    false    218                       0    0 "   estados_tareas_id_estado_tarea_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('huertaconecta.estados_tareas_id_estado_tarea_seq', 6, true);
          huertaconecta               postgres    false    220                        0    0    huertas_id_huerta_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('huertaconecta.huertas_id_huerta_seq', 8, true);
          huertaconecta               postgres    false    222            !           0    0     publicaciones_id_publicacion_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('huertaconecta.publicaciones_id_publicacion_seq', 9, true);
          huertaconecta               postgres    false    224            "           0    0    tareas_id_tarea_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('huertaconecta.tareas_id_tarea_seq', 24, true);
          huertaconecta               postgres    false    226            #           0    0 "   tipos_usuarios_id_tipo_usuario_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('huertaconecta.tipos_usuarios_id_tipo_usuario_seq', 8, true);
          huertaconecta               postgres    false    228            $           0    0 '   usuarios_huertas_id_usuarios_huerta_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('huertaconecta.usuarios_huertas_id_usuarios_huerta_seq', 15, true);
          huertaconecta               postgres    false    231            %           0    0    usuarios_id_usuario_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('huertaconecta.usuarios_id_usuario_seq', 12, true);
          huertaconecta               postgres    false    232            S           2606    16615    cultivos cultivos_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY huertaconecta.cultivos
    ADD CONSTRAINT cultivos_pkey PRIMARY KEY (id_cultivo);
 G   ALTER TABLE ONLY huertaconecta.cultivos DROP CONSTRAINT cultivos_pkey;
       huertaconecta                 postgres    false    217            U           2606    16617 :   estados_tareas estados_tareas_descripcion_estado_tarea_key 
   CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.estados_tareas
    ADD CONSTRAINT estados_tareas_descripcion_estado_tarea_key UNIQUE (descripcion_estado_tarea);
 k   ALTER TABLE ONLY huertaconecta.estados_tareas DROP CONSTRAINT estados_tareas_descripcion_estado_tarea_key;
       huertaconecta                 postgres    false    219            W           2606    16619 "   estados_tareas estados_tareas_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY huertaconecta.estados_tareas
    ADD CONSTRAINT estados_tareas_pkey PRIMARY KEY (id_estado_tarea);
 S   ALTER TABLE ONLY huertaconecta.estados_tareas DROP CONSTRAINT estados_tareas_pkey;
       huertaconecta                 postgres    false    219            Y           2606    16621    huertas huertas_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY huertaconecta.huertas
    ADD CONSTRAINT huertas_pkey PRIMARY KEY (id_huerta);
 E   ALTER TABLE ONLY huertaconecta.huertas DROP CONSTRAINT huertas_pkey;
       huertaconecta                 postgres    false    221            [           2606    16623     publicaciones publicaciones_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY huertaconecta.publicaciones
    ADD CONSTRAINT publicaciones_pkey PRIMARY KEY (id_publicacion);
 Q   ALTER TABLE ONLY huertaconecta.publicaciones DROP CONSTRAINT publicaciones_pkey;
       huertaconecta                 postgres    false    223            ]           2606    16625    tareas tareas_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY huertaconecta.tareas
    ADD CONSTRAINT tareas_pkey PRIMARY KEY (id_tarea);
 C   ALTER TABLE ONLY huertaconecta.tareas DROP CONSTRAINT tareas_pkey;
       huertaconecta                 postgres    false    225            _           2606    16627 :   tipos_usuarios tipos_usuarios_descripcion_tipo_usuario_key 
   CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.tipos_usuarios
    ADD CONSTRAINT tipos_usuarios_descripcion_tipo_usuario_key UNIQUE (descripcion_tipo_usuario);
 k   ALTER TABLE ONLY huertaconecta.tipos_usuarios DROP CONSTRAINT tipos_usuarios_descripcion_tipo_usuario_key;
       huertaconecta                 postgres    false    227            a           2606    16629 "   tipos_usuarios tipos_usuarios_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY huertaconecta.tipos_usuarios
    ADD CONSTRAINT tipos_usuarios_pkey PRIMARY KEY (id_tipo_usuario);
 S   ALTER TABLE ONLY huertaconecta.tipos_usuarios DROP CONSTRAINT tipos_usuarios_pkey;
       huertaconecta                 postgres    false    227            c           2606    16631    usuarios usuarios_correo_key 
   CONSTRAINT     `   ALTER TABLE ONLY huertaconecta.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);
 M   ALTER TABLE ONLY huertaconecta.usuarios DROP CONSTRAINT usuarios_correo_key;
       huertaconecta                 postgres    false    229            g           2606    16633 &   usuarios_huertas usuarios_huertas_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY huertaconecta.usuarios_huertas
    ADD CONSTRAINT usuarios_huertas_pkey PRIMARY KEY (id_usuarios_huertas);
 W   ALTER TABLE ONLY huertaconecta.usuarios_huertas DROP CONSTRAINT usuarios_huertas_pkey;
       huertaconecta                 postgres    false    230            e           2606    16635    usuarios usuarios_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY huertaconecta.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);
 G   ALTER TABLE ONLY huertaconecta.usuarios DROP CONSTRAINT usuarios_pkey;
       huertaconecta                 postgres    false    229            m           2606    16636    usuarios_huertas fk_huerta    FK CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.usuarios_huertas
    ADD CONSTRAINT fk_huerta FOREIGN KEY (id_huerta) REFERENCES huertaconecta.huertas(id_huerta) ON DELETE CASCADE;
 K   ALTER TABLE ONLY huertaconecta.usuarios_huertas DROP CONSTRAINT fk_huerta;
       huertaconecta               postgres    false    230    221    4697            n           2606    16641    usuarios_huertas fk_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.usuarios_huertas
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES huertaconecta.usuarios(id_usuario) ON DELETE CASCADE;
 L   ALTER TABLE ONLY huertaconecta.usuarios_huertas DROP CONSTRAINT fk_usuario;
       huertaconecta               postgres    false    230    4709    229            h           2606    16646 4   publicaciones publicaciones_id_usuarios_huertas_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.publicaciones
    ADD CONSTRAINT publicaciones_id_usuarios_huertas_fkey FOREIGN KEY (id_usuarios_huertas) REFERENCES huertaconecta.usuarios_huertas(id_usuarios_huertas) ON DELETE CASCADE;
 e   ALTER TABLE ONLY huertaconecta.publicaciones DROP CONSTRAINT publicaciones_id_usuarios_huertas_fkey;
       huertaconecta               postgres    false    4711    223    230            i           2606    16651    tareas tareas_id_cultivo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.tareas
    ADD CONSTRAINT tareas_id_cultivo_fkey FOREIGN KEY (id_cultivo) REFERENCES huertaconecta.cultivos(id_cultivo);
 N   ALTER TABLE ONLY huertaconecta.tareas DROP CONSTRAINT tareas_id_cultivo_fkey;
       huertaconecta               postgres    false    217    225    4691            j           2606    16656 "   tareas tareas_id_estado_tarea_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.tareas
    ADD CONSTRAINT tareas_id_estado_tarea_fkey FOREIGN KEY (id_estado_tarea) REFERENCES huertaconecta.estados_tareas(id_estado_tarea);
 S   ALTER TABLE ONLY huertaconecta.tareas DROP CONSTRAINT tareas_id_estado_tarea_fkey;
       huertaconecta               postgres    false    219    225    4695            k           2606    16661 &   tareas tareas_id_usuarios_huertas_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.tareas
    ADD CONSTRAINT tareas_id_usuarios_huertas_fkey FOREIGN KEY (id_usuarios_huertas) REFERENCES huertaconecta.usuarios_huertas(id_usuarios_huertas);
 W   ALTER TABLE ONLY huertaconecta.tareas DROP CONSTRAINT tareas_id_usuarios_huertas_fkey;
       huertaconecta               postgres    false    4711    225    230            l           2606    16666 &   usuarios usuarios_id_tipo_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY huertaconecta.usuarios
    ADD CONSTRAINT usuarios_id_tipo_usuario_fkey FOREIGN KEY (id_tipo_usuario) REFERENCES huertaconecta.tipos_usuarios(id_tipo_usuario);
 W   ALTER TABLE ONLY huertaconecta.usuarios DROP CONSTRAINT usuarios_id_tipo_usuario_fkey;
       huertaconecta               postgres    false    227    4705    229                x  x�m��n�0���S��a���z؊�(zv�%6f K.%����c�G���r�4Mw0hZ���G���M�uK";s���у'(/'==4>'؁���'У P��c�_�r��A�Ѻ��T�ڴ�e�aN�-S,��.��
��}5�T�M�Wz�x��zv��r��K!	ėkvU
�`�ae��k�9�}�{���1��m��n��>e��\d-G���W{�$�:�����-f�l�̚�����)2Ǎ��@��2+�D��Uq!GE��j��wp���K�s�2(�,
��h����IW�ՇL4�w*�����v�4��`[�^��%u�S��vs=咦i�\~2?+��Zu3������g�?ƿ�P�l���bG�         =   x�3�H�K�L�+I�2�t�S(�O/J-��2�t��-�I-ILI�2�tN�KN��c���� �R�         �  x�m�KO�0��ί�u#?�h�$!���LR�N\�?�qzC+Q+�G��|g�Hv��a�l{do������N�<�K��>���`t��zE�7XLrYox��H�+�U]�Z�]!��QbO?�ь�`���aי,Kx ��'��\�W��=荟�ǌG�a���	O��JWM��V�ڢZ=�W3�.,�DW�r�Pur�6e&��9b�>���m�T23�=���j�t�J�4Ź���p��+���*c93���d�B��'.�1J&K_�b�.�2�x0h[�|���dz��m��B_r6���}��g���z�Nv��:KKe��!Q~���2�C?�q��H?	����.}����������m����np�ڋ�ˢ(�O���         �   x�m�A�0E��)� �̴�����4Ek!��.8�`\ ����b^�[q�����1x�5x���yC��)R?�M����u�%ؒlA��
����f��֯�K⏀�M`���poȁ�6�mSw�H�u�A�.0(kp��wR�Y>Am}���,g%�|i=NK         �   x�u�A
�0���s���D��)z 7Sm����z�^���J�1|��+8�%^�d�wao���L2aw��<���{�'`�Z��>5h����.���#B�*vP6��������Q�.�<�?de�BMu2�ݦ�F)�:&<�      
   ?   x�3�tL����,.)JL�/�2�(�/�L-I,���2���L�M*��2���+�,������ �         r  x�}�Mo�0���{ȵ6SNMCJ���$��^�qc��2�����v/[��ˌ����`�WEփ�g�lj���?�A~6��Aހ�f����\[~���d��c�~�;��s����UVϑ�4Ԉ3� lb��t��� �t q���E��jd��MƦ�a�Q�Z�LLA���xYa��R���O�2���fқI��؟�t(U�ra�Y< 䋁z�l���gӋV�%�IJ~��P(���5Dd�S�d�B%�<��7��1Z�!�[��h!>
����0��.%�6#�o7Z3P���{���|�H�����h�/\Rt�>����N���W�o�^�y-�.,#���\���x��a� ��         2   x�3�4�4�4202�50�52�2�44�4G��8-PDL9�P�b���� �6>     